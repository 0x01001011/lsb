import React from 'react'

import styled from 'styled-components'

import { useGetListCoinToken } from '../../services/get-list-coin-tokens'

const HomePageContainer = styled.div`

`
export const HomePage = () => {
  const { status, data, error, isFetching } = useGetListCoinToken()
  if (isFetching) {
    return <HomePageContainer>IsLoading...</HomePageContainer>
  }
  if (error) {
    return <HomePageContainer>{JSON.stringify(error)}</HomePageContainer>
  }
  return <HomePageContainer> {status} + {JSON.stringify(data)}</HomePageContainer>
}
