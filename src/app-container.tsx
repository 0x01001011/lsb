import React from "react"

import {
  Provider,
  useDispatch,
} from "react-redux"
import styled from "styled-components"

import { AppRouter } from "./app-router"
import { MasterLayout } from "./components/layouts/master-layout"
import { store } from "./redux"
import {
  createNewWalletWithPasscode,
  loadWalletWebAssembly,
  useWalletRedux,
} from "./redux/wallet"

const AppRenderContainer = styled.div`

`
const AppRender = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(loadWalletWebAssembly())
  }, [dispatch])

  const isLoading = useWalletRedux(s => s.loading)


  React.useEffect(() => {
    !isLoading && dispatch(createNewWalletWithPasscode({ name: 'khoa', passcode: '122' }))
  }, [isLoading])


  if (isLoading) {
    return <div>Loading Chain Binary...</div>
  }

  return (
    <AppRenderContainer>
      render app
    </AppRenderContainer>
  );
}

export const AppContainer = () => {
  return (
    <Provider store={store}>
      <AppRouter>
        <MasterLayout>
          <AppRender/>
        </MasterLayout>
      </AppRouter>
    </Provider>
  )
}

