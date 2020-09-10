import React from 'react'

import { Provider, useDispatch  Provider, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ReactQueryDevtools } from 'react-query-devtools'

import { AppRouter } from './app-router'
import { store } from './redux'
import { useSettingState } from './redux/settings'
import { loadWalletWebAssembly } from './redux/wallet'

const AppRenderContainer = styled.div``

const AppRender = () => {
	const dispatch = useDispatch()
	React.useEffect(() => {
		dispatch(loadWalletWebAssembly())
	}, [dispatch])

	const isLoading = useSettingState((settings) => settings.loading)

	if (isLoading) {
		return <div>Loading Chain Binary...</div>
	}

	return <AppRenderContainer>render appss</AppRenderContainer>
}

export const AppContainer = () => {
	return (
		<Provider store={store}>
			<AppRouter>
				<MasterLayout>
					<AppRender />
				</MasterLayout>
			</AppRouter>
		</Provider>
	)
}
