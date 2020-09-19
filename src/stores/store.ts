import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

import { rootReducer } from './root-reducer'

const persistConfig = {
	key: 'root',
	storage,
}

export const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
})

export const persister = persistStore(store)

export type AppDispatch = typeof store.dispatch
