import * as incognito from 'incognito-js'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'

interface CreateWalletWithPasscode {
	name: string
	passcode: string
}

export interface WalletState {
	wallet?: incognito.WalletInstance
	passParaphrase: ''
	loading: boolean
}

type AsyncThunkConfig = {
	state: WalletState
	dispatch?: Dispatch
	extra?: any
	rejectValue?: any
}

export const createNewWalletWithPasscode = createAsyncThunk<
	incognito.WalletInstance | undefined,
	CreateWalletWithPasscode,
	AsyncThunkConfig
>('wallet/createNewWallet', async (payload) => {
	try {
		const instance = new incognito.WalletInstance()
		const wallet = await instance.init(payload.name, payload.name)
		console.log(wallet)
		return wallet
	} catch (error) {
		console.error(error)
		return undefined
	}
})

export const loadWalletWebAssembly = createAsyncThunk('wallet/load_assembly', async () => {
	try {
		incognito.setConfig({
			mainnet: true,
			wasmPath: '/privacy.wasm',
		})
		const response = await incognito.goServices.implementGoMethodUseWasm()
		console.log(response)
	} catch (error) {
		console.error(error)
	}
})

const walletInitialState: WalletState = {
	passParaphrase: '',
	loading: true,
}

export const wallets = createSlice({
	name: 'wallets',
	initialState: walletInitialState,
	reducers: {},
	extraReducers: {
		[createNewWalletWithPasscode.fulfilled.toString()]: (state, { payload }) => {
			state.wallet = payload
		},
		[loadWalletWebAssembly.fulfilled.toString()]: (state) => {
			state.loading = false
		},
	},
})

export const useWalletRedux: TypedUseSelectorHook<WalletState> = useSelector
