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
	Input,
	TextField,
	InputAdornment,
} from '@material-ui/core'
import { Alert, Skeleton } from '@material-ui/lab'
import React from 'react'
import { usePairCandles } from 'services/token-collections/pair-candles'
import styled from 'styled-components'
import { usePairsFromUrl } from 'utils/hooks'
import { SelectTokenPopup } from './select-token-popup'
import { TradingDialog } from './trading-dialog'

const SwapboxContainer = styled(TableContainer)`
	padding-bottom: 16px;
	border-bottom: 1px dashed #e3eaf6;
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
	padding: 4px;
	padding-bottom: 16px;
`

const BottomCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 4px;
	padding-bottom: 24px;
`

const InputNumberStyled = styled(Input)`
	&&& {
		input {
			text-align: right;
		}
	}
`
export const SwapBox = () => {
	const pairsData = usePairCandles()
	const { paidToken, receivedToken } = usePairsFromUrl()

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
				<HeaderCardContainer>SWAP TOKENS</HeaderCardContainer>
				<TopCardContainer>
					<SelectTokenPopup isFrom />
					<InputNumberStyled
						type="number"
						defaultValue={0}
						endAdornment={<InputAdornment position="end">{paidToken}</InputAdornment>}
					/>
				</TopCardContainer>
				<BottomCardContainer>
					<SelectTokenPopup />
					<InputNumberStyled
						disabled
						type="number"
						defaultValue={0}
						endAdornment={<InputAdornment position="end">{receivedToken}</InputAdornment>}
					/>
				</BottomCardContainer>
				<TradingDialog />
			</SwapboxCard>
		</SwapboxContainer>
	)
}
