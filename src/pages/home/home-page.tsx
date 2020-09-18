import React from 'react'
import { TradeLayout } from 'components/trade-layout'
import styled from 'styled-components'
import { SwapBox, TokenList } from './components'

const SwapboxContainer = styled.div`
	padding: 8px;
`
export const HomePage = () => {
	const SwapBoxComponent = (
		<SwapboxContainer>
			<SwapBox />
		</SwapboxContainer>
	)

	const TokenPairs = (
		<SwapboxContainer>
			<TokenList />
		</SwapboxContainer>
	)

	return (
		<TradeLayout left={TokenPairs} right={SwapBoxComponent}>
			123qweeqewq32s
		</TradeLayout>
	)
}
