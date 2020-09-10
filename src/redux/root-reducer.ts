import { persistReducer } from 'redux-persist'
import { localStorage, syncStorage } from 'redux-persist-webextension-storage'

import { combineReducers } from '@reduxjs/toolkit'
import { accountPages } from './account-page'
import { settings } from './settings'

import { wallets } from './wallet'
import { showroom } from './showroom'

const localStorageConfig = {
	key: 'localStorage',
	storage: localStorage,
}

export const rootReducer = combineReducers({
	showroom: showroom.reducer,
	[wallets.name]: persistReducer(localStorageConfig, wallets.reducer),
	[settings.name]: persistReducer(localStorageConfig, settings.reducer),
	[accountPages.name]: persistReducer(localStorageConfig, accountPages.reducer),
})

export type RootState = ReturnType<typeof rootReducer>
