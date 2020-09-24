import React from 'react'
import styled from 'styled-components'
import PrvSrc from 'assets/prv@2x.png'
import { TokenUiModel } from 'models/token'
import { AvatarGroup } from '@material-ui/lab'
import { Avatar, CardHeader, Typography } from '@material-ui/core'
import { useTradingState } from 'stores/implements/trading'
import { useCandleSticks } from 'services/revolutions'
import { usePairsFromUrl } from 'utils/hooks'
import { isEmpty, last } from 'lodash'

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 5vw;
`

const Title = styled(Typography)`
	font-weight: 400;
`

export type HeaderProps = {
	firstToken: TokenUiModel
	secondToken: TokenUiModel
}

const PriceStyled = styled.span`
	font-weight: lighter;
	font-size: 30px;
`
const PriceTokenStyled = styled.span`
	margin-left: 4px;
	font-weight: lighter;
	font-size: 20px;
	color: rgba(0, 0, 0, 0.6);
`

export const ChartHeader = ({ firstToken, secondToken }) => {
	const { tokenSymbol: symbolSt, icon: iconSt } = firstToken
	const { tokenSymbol: symbolNd, icon: iconNd } = secondToken
	const granuality = useTradingState((s) => s.granuality)
	const { paidToken, receivedToken } = usePairsFromUrl()
	const { data } = useCandleSticks(`${paidToken}-${receivedToken}`, granuality)

	const lastPrice = React.useMemo(() => {
		if (!data || isEmpty(data)) {
			return { close: 0, time: new Date() }
		}
		return last(data)
	}, [data])

	return (
		<Wrapper>
			<div>
				<AvatarGroup>
					<Avatar src={symbolSt === 'PRV' ? PrvSrc : iconSt} alt={symbolSt} />
					<Avatar src={symbolNd === 'PRV' ? PrvSrc : iconNd} alt={symbolNd} />
				</AvatarGroup>
				<Title variant="h5">
					{symbolSt}-{symbolNd}
				</Title>
			</div>
			<CardHeader
				title={
					<div>
						<PriceStyled>1</PriceStyled>
						<PriceTokenStyled>{paidToken}</PriceTokenStyled>
						<PriceStyled> ~ </PriceStyled>
						<PriceStyled>{lastPrice.close.toFixed(9).slice(0, 10)}</PriceStyled>
						<PriceTokenStyled>{receivedToken}</PriceTokenStyled>
					</div>
				}
			/>
		</Wrapper>
	)
}
