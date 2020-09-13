import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { localStorage } from 'redux-persist-webextension-storage'

import { accountPages } from './implements/account-page'
import { settings } from './implements/settings'

import { wallets } from './implements/wallet'
import { showroom } from './implements/showroom'
import { trading } from './implements/trading'

const localStorageConfig = {
	key: 'localStorage',
	storage: localStorage,
}

export const rootReducer = combineReducers({
	showroom: showroom.reducer,
	[wallets.name]: persistReducer(localStorageConfig, wallets.reducer),
	[settings.name]: persistReducer(localStorageConfig, settings.reducer),
	[accountPages.name]: persistReducer(localStorageConfig, accountPages.reducer),
	[trading.name]: persistReducer(localStorageConfig, trading.reducer),
})

export type RootState = ReturnType<typeof rootReducer>
