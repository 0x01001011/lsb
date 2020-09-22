import React from 'react'
import styled from 'styled-components'
import { useTokenInfos } from 'services/token-collections'
import { PropagateLoader } from 'react-spinners'
import { useTradingState } from 'stores/implements/trading'
import { ChartHeader } from './chart-header'
import { CandleChart } from './candle-chart'
import { ChartFooter } from './chart-footer'

const initialState = {
	firstToken: undefined,
	secondToken: undefined,
}

export type CandleStockProps = {
	paidToken: string
	receivedToken: string
}

const CandleStockContainer = styled.div`
	position: relative;
	padding: 8px 12px;
`
export const CandleStock = () => {
	const [tokens, setTokens] = React.useState(initialState)
	const { isFetching, data } = useTokenInfos('Ally')
	const { paidToken, receivedToken } = useTradingState((state) => state)

	const { firstToken, secondToken } = tokens

	React.useEffect(() => {
		if (data) {
			const firstToken = data.find((t) => t.tokenSymbol === paidToken)
			const secondToken = data.find((t) => t.tokenSymbol === receivedToken)

			setTokens({ ...tokens, firstToken, secondToken })
		}
	}, [data, receivedToken, paidToken])

	if (isFetching || !firstToken || !secondToken) {
		return (
			<StyledLoading>
				<PropagateLoader size={24} color="#e6eaf2" />
			</StyledLoading>
		)
	}

	return (
		<CandleStockContainer>
			<ChartHeader firstToken={firstToken} secondToken={secondToken} />
			<CandleChart />
			<ChartFooter />
		</CandleStockContainer>
	)
}

const StyledLoading = styled.div`
	margin: calc(30vh - 45px) 0px;
	align-self: center;
`
