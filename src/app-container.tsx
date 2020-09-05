import React from 'react'

import { ReactQueryDevtools } from 'react-query-devtools'
import {
	Provider,
	useDispatch,
} from 'react-redux'
import styled from 'styled-components'

import { AppRouter } from './app-router'
import { store } from './redux'
import {
	createNewWalletWithPasscode,
	loadWalletWebAssembly,
	useWalletRedux,
} from './redux/wallet'
import { useGetListCoinToken } from './services/get-list-coin-tokens'

const AppRenderContainer = styled.div`

`
const AppRender = () => {
	const dispatch = useDispatch()
	React.useEffect(() => {
		dispatch(loadWalletWebAssembly())
	}, [dispatch])
  
	// const { status, data, error, isFetching } = useGetListCoinToken()
	const isLoading = useWalletRedux(s => s.loading)
  

	React.useEffect(() => {
		!isLoading && dispatch(createNewWalletWithPasscode({ name: 'khoa', passcode: '122' }))
	}, [isLoading])


  
	if (isLoading) {
		return <div>Loading Chain Binary...</div>
	}
  
	// if (isFetching) {
	// 	return <AppRenderContainer>IsLoading...</AppRenderContainer>
	// }
	// if (error) {
	// 	return <AppRenderContainer>{JSON.stringify(error)}</AppRenderContainer>
	// }

	return (
		<AppRenderContainer>
			{/* {status} + {JSON.stringify(data)} */}
		</AppRenderContainer>
	)
}

export const AppContainer = () => {
	return (
		<Provider store={store}>
			<AppRouter>
				<AppRender/>
			</AppRouter>
			<ReactQueryDevtools initialIsOpen />
		</Provider>
	)
}


