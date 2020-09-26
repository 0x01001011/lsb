import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ReactQueryCacheProvider } from 'react-query'
import { Provider, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { queryCache } from 'services/query-cache'
import { AppRouter } from './app-router'
import { store } from './stores'
import { loadWalletFromSessionIfExisted, loadWalletWebAssembly, useWalletState } from './stores/implements/wallet'

const AppRenderContainer = styled.div``

const AppRender = ({ children }) => {
	const dispatch = useDispatch()
	const isSDKLoaded = useWalletState((s) => s.sdkLoaded)
	React.useEffect(() => {
		dispatch(loadWalletWebAssembly())
	}, [dispatch])

	React.useEffect(() => {
		if (isSDKLoaded) {
			dispatch(loadWalletFromSessionIfExisted())
		}
	}, [isSDKLoaded])

	return <AppRenderContainer>{children}</AppRenderContainer>
}

export const AppContainer = () => {
	return (
		<Provider store={store}>
			<ReactQueryCacheProvider queryCache={queryCache}>
				<AppRender>
					<AppRouter />
				</AppRender>
				<ReactQueryDevtools />
			</ReactQueryCacheProvider>
		</Provider>
	)
}
