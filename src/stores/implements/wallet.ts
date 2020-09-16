import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelectorForSlice } from 'stores/utils'
import { AccountInfoInterface, encrytePassword, sdk, walletService } from 'services/incognito'
import { tokenService } from 'services/incognito/token'

import { settings } from './settings'

interface CreateWalletWithPasscode {
	name: string
	passcode: string
}

interface WalletState {
	password?: string
	backupStr?: string
	selectAccountName?: string
	account?: AccountInfoInterface
	connectError?: string
	isConnecting?: boolean
}

const walletInitialState: WalletState = {}

type AsyncThunkConfig = {
	state: typeof walletInitialState
	dispatch?: any
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

export const connectViaPrivateKey = createAsyncThunk<void, { privateKey: string }, AsyncThunkConfig>(
	'wallet/connectViaPrivateKey',
	async ({ privateKey }, { dispatch }) => {
		const accountInstance = await walletService.createWalletViaPrivateKey(privateKey)
		dispatch(selectAccount({ accountName: accountInstance.name }))
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
	},
})

export const { actions } = wallets
export const useWalletState = createSelectorForSlice(wallets)
