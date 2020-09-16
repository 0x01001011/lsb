import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Button, createStyles, fade, Grid, makeStyles, Theme, Typography, useTheme } from '@material-ui/core'
import { TwoColumnLayout } from 'components/layouts/two-column-layout'
import { useCandleSticks, useUsdEvolution } from 'services/revolutions'
import clsx from 'clsx'
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import {
	changeGranuality,
	changeToken,
	PairCandleGranuality,
	resetTrading,
	useTradingState,
} from 'stores/implements/trading'
import { useDispatch } from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import { TradingCard } from './components/trading-card'
import { CandlesChart } from './components/candles-charts'

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
	min-height: 410px;
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

const ANNOT = { '1month': '30 days', '6months': '6 months', '1year': '12 months' }

export const PairTradingPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const theme = useTheme()

	const { paidToken, receivedToken } = useParams<{ paidToken: string; receivedToken: string }>()
	const { granuality } = useTradingState((state) => state)
	const { isFetching, data, error } = useCandleSticks(`${paidToken}-${receivedToken}`, granuality)

	const [amount, setAmount] = React.useState(0)
	const [timestamp, setTime] = React.useState(0)

	/* ComponentDidMount */
	React.useEffect(() => {
		dispatch(changeToken({ paidToken, receivedToken }))

		return () => dispatch(resetTrading())
	}, [paidToken, receivedToken])

	const handleChangeGranuality = (event: React.MouseEvent<HTMLElement>, value: PairCandleGranuality) => {
		dispatch(changeGranuality({ granuality: value }))
	}

	return (
		<TwoColumnLayout>
			<TradingContainer container>
				<Grid className={classes.leftColumn} item md={7}>
					<LeftContent>
						<Typography variant="h4" gutterBottom>
							Swap {paidToken}/{receivedToken}
						</Typography>
						{/* <Typography variant="h3" gutterBottom>
							$ {isFetching ? '-' : amount.toFixed(2)}{' '}
							<DateAnnotation>{` (${new Date(timestamp * 1000).toLocaleString('vi-VN')})`}</DateAnnotation>
						</Typography>
						<Typography className={classes.summaryText} gutterBottom>
							{!isFetching && (
								<span
									style={{
										color: percentage < 0 ? '#f783ac' : '#47ecad',
									}}
								>
									{percentage > 0 && '+'}
									{percentage.toFixed(2)}%
								</span>
							)}{' '}
							last {ANNOT[singleGranuality]}
						</Typography> */}
						<ChartWrapper>
							{isFetching ? (
								<PropagateLoader size={24} color={theme.palette.text.hint} />
							) : (
								<CandlesChart lastCandle={data} />
							)}
						</ChartWrapper>

						{/* Granual selector */}
						<GutterBottom>
							<ToggleButtonGroup value={granuality} exclusive onChange={handleChangeGranuality}>
								<ToggleButton className={clsx(classes.granualItem, classes.styledButton)} value="1HOUR" disabled>
									1H
								</ToggleButton>
								<ToggleButton className={clsx(classes.granualItem, classes.styledButton)} value="6HOURS" disabled>
									6H
								</ToggleButton>
								<ToggleButton className={clsx(classes.granualItem, classes.styledButton)} value="1DAY">
									1D
								</ToggleButton>
							</ToggleButtonGroup>
						</GutterBottom>
					</LeftContent>
				</Grid>
				<Grid className={classes.rightColumn} item md={5}>
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
