import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'

import { Provider, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { AppRouter } from './app-router'
import { store } from './stores'
import { useSettingState } from './stores/implements/settings'
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
	return (
		<Provider store={store}>
			<AppRender>
				<AppRouter />
			</AppRender>
			<ReactQueryDevtools />
		</Provider>
	)
}
