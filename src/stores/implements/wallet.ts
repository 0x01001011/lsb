import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelectorForSlice } from 'stores/utils'
import { AccountInfoInterface, sdk, walletService } from 'services/incognito'
import { WALLET_CONSTANTS } from 'constants/wallet'

type TxStatus = {
	code: 0 | 1 // 0 - Error, 1 - Success
	errorMessage: string
}

interface WalletState {
	selectAccountName?: string
	account?: AccountInfoInterface
	connectError?: string
	isConnecting?: boolean
	sdkLoaded?: boolean
	txStatus?: TxStatus
}

const walletInitialState: WalletState = {}

type AsyncThunkConfig = {
	state: typeof walletInitialState
	dispatch?: any
	extra?: any
	rejectValue?: any
}

export const loadWalletFromSessionIfExisted = createAsyncThunk<any, void, AsyncThunkConfig>(
	'wallet/loadWalletFromSessionIfExisted',
	async (_, { dispatch }) => {
		const isExisted = await walletService.loadWalletFromSessionIfExisted()
		if (isExisted) {
			dispatch(selectAccount({ accountName: walletService.getNameFirstAccount() }))
		}
	},
)

export const selectAccount = createAsyncThunk<AccountInfoInterface, { accountName: string }, AsyncThunkConfig>(
	'wallet/reloadWallet',
	async ({ accountName }) => {
		const accountInfo = await walletService.getAccountInfo(accountName)
		return accountInfo
	},
)

export const clearAccount = createAsyncThunk<any, void, AsyncThunkConfig>('wallet/clearAccount', async () => {
	return walletService.clearAccount()
})

export const connectViaPrivateKey = createAsyncThunk<void, { privateKey: string }, AsyncThunkConfig>(
	'wallet/connectViaPrivateKey',
	async ({ privateKey }, { dispatch }) => {
		const accountInstance = await walletService.createWalletViaPrivateKey(privateKey)
		dispatch(selectAccount({ accountName: accountInstance.name }))
	},
)

export const loadWalletWebAssembly = createAsyncThunk('wallet/load_assembly', async () => {
	return sdk.initSDK('/privacy.wasm')
})

export const followTokenById = createAsyncThunk<void, { tokenId: string }, AsyncThunkConfig>(
	'wallet/followTokenById',
	async ({ tokenId }, { dispatch }) => {
		await walletService.followTokenById(tokenId)
		dispatch(selectAccount({ accountName: WALLET_CONSTANTS.ONE_TIME_WALLET_NAME }))
	},
)

export const requestTrade = createAsyncThunk<
	void,
	{ buyTokenId: string; amount: number; fromTokenId?: string },
	AsyncThunkConfig
>('wallet/requestTrade', async ({ buyTokenId, amount, fromTokenId }, { dispatch }) => {
	console.log(await walletService.requestBuyToken(buyTokenId, amount, fromTokenId))
})

export const wallets = createSlice({
	name: 'wallets',
	initialState: walletInitialState,
	reducers: {},
	extraReducers: {
		[selectAccount.fulfilled.toString()]: (state, action: PayloadAction<AccountInfoInterface>) => {
			state.account = action.payload
		},
		[connectViaPrivateKey.rejected.toString()]: (state, action: PayloadAction<Error>) => {
			state.connectError = action.payload.message
			state.isConnecting = false
		},
		[connectViaPrivateKey.pending.toString()]: (state) => {
			state.isConnecting = true
		},
		[connectViaPrivateKey.fulfilled.toString()]: (state) => {
			state.isConnecting = false
		},
		[loadWalletWebAssembly.fulfilled.toString()]: (state) => {
			state.sdkLoaded = true
		},
		[loadWalletWebAssembly.pending.toString()]: (state) => {
			state.sdkLoaded = false
		},
		[clearAccount.fulfilled.toString()]: (state) => {
			state.account = undefined
			state.selectAccountName = undefined
		},
		[requestTrade.fulfilled.toString()]: (state) => {
			state.txStatus = {
				code: 1,
				errorMessage: '',
			}
		},
		[requestTrade.rejected.toString()]: (state, action: PayloadAction<Error>) => {
			const { message } = action.payload
			state.txStatus = {
				code: 0,
				errorMessage: message,
			}
		},
	},
})

export const { actions } = wallets
export const useWalletState = createSelectorForSlice(wallets)
