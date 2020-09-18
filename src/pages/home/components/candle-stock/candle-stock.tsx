import React from 'react'
import styled from 'styled-components'
import { useTokenInfos } from 'services/token-collections'
import { PropagateLoader } from 'react-spinners'
import { ChartHeader } from './chart-header'
import { CandleChart } from './candle-chart'

const initialState = {
	firstToken: undefined,
	secondToken: undefined,
}

export type CandleStockProps = {
	paidToken: string
	receivedToken: string
}

export const CandleStock = ({ paidToken, receivedToken }: CandleStockProps) => {
	const [tokens, setTokens] = React.useState(initialState)
	const { isFetching, data } = useTokenInfos('Ally')

	const { firstToken, secondToken } = tokens

	React.useEffect(() => {
		if (data) {
			const firstToken = data.find((t) => t.tokenSymbol === paidToken)
			const secondToken = data.find((t) => t.tokenSymbol === receivedToken)

			setTokens({ ...tokens, firstToken, secondToken })
		}
	}, [data])

	if (isFetching || !firstToken || !secondToken) {
		return (
			<StyledLoading>
				<PropagateLoader size={24} color="#294698" />
			</StyledLoading>
		)
	}

	return (
		<>
			<ChartHeader firstToken={firstToken} secondToken={secondToken} />
			<CandleChart firstToken={firstToken.tokenSymbol} secondToken={secondToken.tokenSymbol} />
		</>
	)
}

const StyledLoading = styled.div`
	margin-top: calc(30vh - 45px);
	align-self: center;
`
