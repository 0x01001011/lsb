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
	TextField,
} from '@material-ui/core'
import { Alert, Skeleton } from '@material-ui/lab'
import React from 'react'
import { usePairCandles } from 'services/token-collections/pair-candles'
import styled from 'styled-components'
import { SelectTokenPopup } from './select-token-popup'

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

const HeaderCardContainer = styled.div`
	display: flex;
	width: 100%;
`

const TopCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-bottom: 1px dashed #e3eaf6;
	padding: 16px 4px;
`

const BottomCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 16px 4px;
`

const InputNumberStyled = styled(TextField)`
	padding-left: 16px;
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
				<HeaderCardContainer>SWAP</HeaderCardContainer>
				<TopCardContainer>
					<SelectTokenPopup isFrom />
					<InputNumberStyled size="small" type="number" variant="outlined" />
				</TopCardContainer>
				<BottomCardContainer>
					<SelectTokenPopup />
					<InputNumberStyled disabled size="small" type="number" variant="outlined" />
				</BottomCardContainer>
			</SwapboxCard>
		</SwapboxContainer>
	)
}
