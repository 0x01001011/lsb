import { persistReducer } from 'redux-persist'
import { localStorage, syncStorage } from 'redux-persist-webextension-storage'

import { combineReducers } from '@reduxjs/toolkit'

import { wallets } from './wallet'

const localStorageConfig = {
	key: 'localStorage',
	storage: localStorage,
}

const syncStorageConfig = {
	key: 'syncStorage',
	storage: syncStorage,
}

export const rootReducer = combineReducers({
	localStorage: persistReducer(localStorageConfig, wallets.reducer),
	syncStorage: persistReducer(syncStorageConfig, wallets.reducer),
	wallets: wallets.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
