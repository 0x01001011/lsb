/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useParams } from 'react-router-dom'
import { Button, createStyles, fade, Grid, makeStyles, Theme, Typography, useTheme } from '@material-ui/core'
import { TwoColumnLayout } from 'components/layouts/two-column-layout'
import { useUsdEvolution } from 'services/revolutions'
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, Dot } from 'recharts'
import clsx from 'clsx'
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import {
	AggregationType,
	changeAggregation,
	changeToken,
	resetTrading,
	useTradingState,
} from 'stores/implements/trading'
import { useDispatch } from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import { Empty } from 'antd'
import { TokenUiModel } from 'models/token'
import { useTokenInfos } from 'services/token-collections'
import { TradingCard } from './components/trading-card'
import { LineStock } from './components/line-stock'

const TradingContainer = styled(Grid)`
	min-height: 100vh;
	position: relative;
`

const LeftContent = styled.div`
	margin-top: 128px;
	display: flex;
	flex-direction: column;
	min-height: 120vh;
`
const RightContent = styled.div`
	margin-top: 128px;
	position: fixed;
	top: 0px;
	right: auto;
`

const TradingCardWrapper = styled.div`
	position: relative;
`

const DateAnnotation = styled.span`
	font-size: 1.2rem;
`

const GutterBottom = styled.div`
	display: flex;
	margin-bottom: 16px;
	justify-content: flex-end;
`

const ChartWrapper = styled.div`
	padding: 8px 0px;
	height: 300px;
	min-height: 300px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16px;
`

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		leftColumn: {
			background: theme.palette.background.default,
			flexGrow: 1,
		},
		rightColumn: {
			background: theme.palette.background.default,
			flexGrow: 1,
			display: 'flex',
			justifyContent: 'flex-end',
		},
		summaryText: {
			color: '#303030',
		},
		titleText: {
			fontWeight: 700,
			margin: 16,
		},
		granualItem: {
			justifySelf: 'flex-end',
			alignSelf: 'center',
			border: 'none',
			padding: '0px 11px',
		},
		styledButton: {
			'&.MuiButton-root': {
				textTransform: 'center',
				justifyContent: 'center',

				'&:hover': {
					background: 'transparent',
				},
			},
		},
	}),
)

export const SingleTradingPage = () => {
	const theme = useTheme()
	const query = new URLSearchParams(useLocation().search)
	const dispatch = useDispatch()

	const [token, setToken] = React.useState<TokenUiModel>(null)
	const { tokenSymbol } = useParams<{ tokenSymbol: string }>()
	const { isFetching, data: tokens = [] } = useTokenInfos('Ally')

	/* ComponentDidMount */
	React.useEffect(() => {
		if (query.get('type') === 'RECEIVE') {
			dispatch(changeToken({ receivedToken: tokenSymbol }))
		} else {
			dispatch(changeToken({ paidToken: tokenSymbol }))
		}

		return () => dispatch(resetTrading())
	}, [tokenSymbol])

	React.useEffect(() => {
		setToken(tokens.find((t) => t.tokenSymbol === tokenSymbol))
		console.log('Update info.. ')
	}, [tokens])

	return (
		<TwoColumnLayout>
			<TradingContainer container>
				<Grid
					style={{
						background: theme.palette.background.default,
						flexGrow: 1,
					}}
					item
					md={7}
				>
					<LeftContent>
						{token && <LineStock token={token} />}
						{/* <Typography className={classes.titleText} gutterBottom>
							About {tokenSymbol}
						</Typography> */}
					</LeftContent>
				</Grid>
				<Grid
					style={{
						background: theme.palette.background.default,
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'flex-end',
					}}
					item
					md={5}
				>
					<RightContent>
						<TradingCardWrapper>
							<TradingCard />
						</TradingCardWrapper>
					</RightContent>
				</Grid>
			</TradingContainer>
		</TwoColumnLayout>
	)
}
