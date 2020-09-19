import { combineReducers } from '@reduxjs/toolkit'
import { accountPages } from './implements/account-page'
import { settings } from './implements/settings'

import { wallets } from './implements/wallet'
import { showroom } from './implements/showroom'
import { trading } from './implements/trading'

export const rootReducer = combineReducers({
	showroom: showroom.reducer,
	[wallets.name]: wallets.reducer,
	[settings.name]: settings.reducer,
	[accountPages.name]: accountPages.reducer,
	[trading.name]: trading.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
