import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { tokenService } from '../services/incognito/token'
import { AccountInfoInterface } from '../services/incognito/wallet'

import { encrytePassword, walletService, sdk } from '../services'
import { settings } from './settings'
import { createSelectorForSlice } from './utils'

interface CreateWalletWithPasscode {
	name: string
	passcode: string
}

interface WalletState {
	password?: string
	backupStr?: string
	selectAccountName?: string
	account?: AccountInfoInterface
}

const walletInitialState: WalletState = {}

type AsyncThunkConfig = {
	state: typeof walletInitialState
	dispatch?: Dispatch
	extra?: any
	rejectValue?: any
}

export const createNewWalletWithPasscode = createAsyncThunk<any, CreateWalletWithPasscode, AsyncThunkConfig>(
	'wallet/createNewWallet',
	async (payload, { dispatch }) => {
		const encrytedPass = encrytePassword(payload.passcode)
		const wallet = await walletService.createWallet(payload.name)
		const backupStr = wallet.backup(encrytedPass)
		dispatch(wallets.actions.savePassword({ password: encrytedPass }))
		dispatch(wallets.actions.setWalletBackupStr({ backupStr }))
		dispatch(selectAccount({ accountName: walletService.getNameFirstAccount() }))
	},
)

export const selectAccount = createAsyncThunk<AccountInfoInterface, { accountName: string }, AsyncThunkConfig>(
	'wallet/reloadWallet',
	async ({ accountName }) => {
		return walletService.getAccountInfo(accountName)
	},
)

export const loadWalletWebAssembly = createAsyncThunk('wallet/load_assembly', async (_, { dispatch }) => {
	try {
		dispatch(settings.actions.setGlobalLoading({ isLoading: true }))
		await sdk.initSDK('/privacy.wasm')
		dispatch(fetchTokens())
	} catch (error) {
		console.error(error)
	}
	dispatch(settings.actions.setGlobalLoading({ isLoading: false }))
})

export const fetchTokens = createAsyncThunk<any, void, AsyncThunkConfig>('wallet/fetchTokens', async () => {
	return tokenService.getTokenList()
})

export const wallets = createSlice({
	name: 'wallets',
	initialState: walletInitialState,
	reducers: {
		savePassword: (state, action: PayloadAction<{ password: string }>) => {
			state.password = action.payload.password
		},
		setWalletBackupStr: (state, action: PayloadAction<{ backupStr: any }>) => {
			state.backupStr = action.payload.backupStr
		},
	},
	extraReducers: {
		[selectAccount.fulfilled.toString()]: (state, action: PayloadAction<AccountInfoInterface>) => {
			state.account = action.payload
		},
	},
})

export const useWalletRedux: TypedUseSelectorHook<WalletState> = useSelector
