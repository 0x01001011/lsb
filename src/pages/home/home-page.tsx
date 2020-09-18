import React from 'react'
import { TradeLayout } from 'components/trade-layout'
import styled from 'styled-components'
import { TokenList } from './components'

const SwapboxContainer = styled.div`
	padding: 8px;
`
export const HomePage = () => {
	const SwapBox = (
		<SwapboxContainer>
			<div>Swapbox</div>
		</SwapboxContainer>
	)

	const TokenPairs = (
		<SwapboxContainer>
			<TokenList />
		</SwapboxContainer>
	)

	return (
		<TradeLayout left={TokenPairs} right={SwapBox}>
			123qweeqewq32s
		</TradeLayout>
	)
}
