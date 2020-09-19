import React from 'react'
import styled from 'styled-components'
import { TradeLayout } from 'components/trade-layout'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeToken, resetTrading } from 'stores/implements/trading'

import { SwapBox, TokenList, SwapBoxInfo } from './components'
import { CandleStock } from './components/candle-stock/candle-stock'

const SwapboxContainer = styled.div`
	padding: 8px;
	min-height: calc(100vh - 90px);
`

const CandleChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: calc(60vh - 90px);
`

export const HomePage = () => {
	const dispatch = useDispatch()
	const { paidToken = 'PRV', receivedToken = 'pUSDT' } = useParams<{ paidToken: string; receivedToken: string }>()

	/* Effect */
	React.useEffect(() => {
		dispatch(changeToken({ paidToken, receivedToken }))
		return () => dispatch(resetTrading())
	}, [paidToken, receivedToken])

	const SwapBoxComponent = (
		<SwapboxContainer>
			<SwapBox />
			<SwapBoxInfo />
		</SwapboxContainer>
	)

	const TokenPairs = (
		<SwapboxContainer>
			<TokenList />
		</SwapboxContainer>
	)

	return (
		<TradeLayout left={TokenPairs} right={SwapBoxComponent}>
			<CandleChartContainer>
				<CandleStock paidToken={paidToken} receivedToken={receivedToken} />
			</CandleChartContainer>
		</TradeLayout>
	)
}
