import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Provider, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { REACT_REQUEST_CONFIG } from 'constants/api'
import { PersistGate } from 'redux-persist/integration/react'
import { AppRouter } from './app-router'
import { store, persister } from './stores'
import { loadWalletWebAssembly } from './stores/implements/wallet'

const AppRenderContainer = styled.div``

const AppRender = ({ children }) => {
	const dispatch = useDispatch()
	React.useEffect(() => {
		dispatch(loadWalletWebAssembly())
	}, [dispatch])

	return <AppRenderContainer>{children}</AppRenderContainer>
}

export const AppContainer = () => {
	const queryCache = new QueryCache(REACT_REQUEST_CONFIG)

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<ReactQueryCacheProvider queryCache={queryCache}>
					<AppRender>
						<AppRouter />
					</AppRender>
					<ReactQueryDevtools />
				</ReactQueryCacheProvider>
			</PersistGate>
		</Provider>
	)
}
