import React from 'react'
import styled from 'styled-components'
import { TradeLayout } from 'components/trade-layout'
import { CandleChart } from 'pages/trading/components/candle-chart'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeToken, resetTrading } from 'stores/implements/trading'
import { useTokenInfos } from 'services/token-collections'
import { PropagateLoader } from 'react-spinners'

import { SwapBox, TokenList } from './components'
import { ChartHeader } from './components/chart-header'

const initialState = {
	firstToken: undefined,
	secondToken: undefined,
}

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
	const [tokens, setTokens] = React.useState(initialState)
	const { paidToken = 'PRV', receivedToken = 'pUSDT' } = useParams<{ paidToken: string; receivedToken: string }>()
	const { isFetching, data } = useTokenInfos('Ally')

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

	const CandleStock = () => {
		const { firstToken, secondToken } = tokens

		return (
			<CandleChartContainer>
				{!isFetching && firstToken && secondToken ? (
					<>
						<ChartHeader firstToken={firstToken} secondToken={secondToken} />
						<CandleChart firstToken={firstToken.tokenSymbol} secondToken={secondToken.tokenSymbol} />
					</>
				) : (
					<StyledLoading>
						<PropagateLoader size={24} color="#294698" />
					</StyledLoading>
				)}
			</CandleChartContainer>
		)
	}

	/* Effect */
	React.useEffect(() => {
		dispatch(changeToken({ paidToken, receivedToken }))
		return () => dispatch(resetTrading())
	}, [paidToken, receivedToken])

	React.useEffect(() => {
		if (data) {
			const firstToken = data.find((t) => t.tokenSymbol === paidToken)
			const secondToken = data.find((t) => t.tokenSymbol === receivedToken)

			setTokens({ ...tokens, firstToken, secondToken })
		}
	}, [data])

	return (
		<TradeLayout left={TokenPairs} right={SwapBoxComponent}>
			<CandleStock />
		</TradeLayout>
	)
}

const StyledLoading = styled.div`
	margin-top: calc(30vh - 45px);
	align-self: center;
`
