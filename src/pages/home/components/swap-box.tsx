import {
	TableContainer,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
	Chip,
	Divider,
	Grid,
} from '@material-ui/core'
import { Alert, Skeleton } from '@material-ui/lab'
import React from 'react'
import { usePairCandles } from 'services/token-collections/pair-candles'
import styled from 'styled-components'

const SwapboxContainer = styled(TableContainer)`
	/* background-color: #f4f7fa; */
	/* margin: 2px; */
	/* padding: 12px; */
	/* border-radius: 8px; */
`

const SwapboxCard = styled.div`
	background-color: white;
	display: flex;
	flex-grow: 1;
	flex-direction: column;
`

const TopCardContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100px;
`

const BottomCardContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100px;
`

export const SwapBox = () => {
	const pairsData = usePairCandles()
	if (pairsData.isLoading) {
		return (
			<div>
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
			</div>
		)
	}
	if (pairsData.isError) {
		return (
			<div>
				<Alert variant="filled" severity="error">
					Fetch Data Error
				</Alert>
			</div>
		)
	}
	return (
		<SwapboxContainer>
			<SwapboxCard>
				<TopCardContainer>top</TopCardContainer>
				<Divider />
				<BottomCardContainer>Botton</BottomCardContainer>
			</SwapboxCard>
		</SwapboxContainer>
	)
}
