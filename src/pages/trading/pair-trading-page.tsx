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
	margin-right: 32px;
	display: flex;
	flex-direction: column;
	min-height: 120vh;
`
const RightContent = styled.div`
	margin: 128px 48px;
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
			background: '#f6f6f9',
			flexGrow: 1,
			display: 'flex',
			justifyContent: 'flex-start',
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

	/* Proper received data */
	// const { currentAmount } = data || { currentAmount: [{ time: 0, value: 0 }] }
	// const properRecords = currentAmount.filter(({ value }) => value)

	// let percentage = 0
	// let last = 0

	// if (!isFetching && properRecords.length > 0) {
	// 	last = Number(properRecords[properRecords.length - 1].value)
	// 	const first = Number(properRecords[0].value)
	// 	percentage = first === 0 ? 0 : (last - first) / first
	// }

	// React.useEffect(() => {
	// 	if (!isFetching && properRecords.length > 0) {
	// 		const { time, value } = properRecords[properRecords.length - 1]
	// 		setTime(Number(time))
	// 		setAmount(Number(value))
	// 	}
	// }, [isFetching])

	// /* Handling UI methods */
	// const handleDotActive = ({ payload }) => {
	// 	const { time, value } = payload
	// 	setTime(Number(time))
	// 	setAmount(Number(value))
	// }

	// const handleChartMouseLeave = React.useCallback(() => {
	// 	if (properRecords && properRecords.length > 0) {
	// 		const { time, value } = properRecords[properRecords.length - 1]
	// 		setTime(Number(time))
	// 		setAmount(Number(value))
	// 	}
	// }, [isFetching])

	const handleChangeGranuality = (event: React.MouseEvent<HTMLElement>, value: PairCandleGranuality) => {
		dispatch(changeGranuality({ granuality: value }))
	}

	return (
		<TwoColumnLayout>
			<TradingContainer container>
				<Grid className={classes.leftColumn} item lg={8} md={7}>
					<LeftContent>
						<Typography variant="h4" gutterBottom>
							{paidToken} to {receivedToken}.
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
				<Grid className={classes.rightColumn} item lg={4} md={5}>
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
