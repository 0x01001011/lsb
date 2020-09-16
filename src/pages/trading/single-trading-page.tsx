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
import { TradingCard } from './components/trading-card'

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
	padding: 8px 0px;
	min-height: 300px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f6f6f9;
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

const ANNOT = { '1MONTH': '30 days', '6MONTHS': '6 months', '1YEAR': '12 months' }

export const SingleTradingPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const theme = useTheme()
	const query = new URLSearchParams(useLocation().search)

	const { tokenSymbol } = useParams<{ tokenSymbol: string }>()
	const { aggregation } = useTradingState((state) => state)
	const { isFetching, data, error } = useUsdEvolution(tokenSymbol, aggregation)

	const [amount, setAmount] = React.useState(0)
	const [timestamp, setTime] = React.useState(0)

	/* Proper received data */
	const { currentAmount } = data || { currentAmount: [{ time: 0, value: 0 }] }
	const properRecords = currentAmount.filter(({ value }) => value)

	let percentage = 0
	let last = 0

	if (!isFetching && properRecords.length > 0) {
		last = Number(properRecords[properRecords.length - 1].value)
		const first = Number(properRecords[0].value)
		percentage = first === 0 ? 0 : (last - first) / first
	}

	React.useEffect(() => {
		if (!isFetching && properRecords.length > 0) {
			const { time, value } = properRecords[properRecords.length - 1]
			setTime(Number(time))
			setAmount(Number(value))
		}
	}, [isFetching])

	/* Handling UI methods */
	const handleDotActive = ({ payload }) => {
		const { time, value } = payload
		setTime(Number(time))
		setAmount(Number(value))
	}

	const handleChartMouseLeave = React.useCallback(() => {
		if (properRecords && properRecords.length > 0) {
			const { time, value } = properRecords[properRecords.length - 1]
			setTime(Number(time))
			setAmount(Number(value))
		}
	}, [isFetching])

	const handleChangeAggregation = (event: React.MouseEvent<HTMLElement>, value: AggregationType) => {
		dispatch(changeAggregation({ aggregation: value }))
	}

	/* ComponentDidMount */
	React.useEffect(() => {
		if (query.get('type') === 'RECEIVE') {
			dispatch(changeToken({ receivedToken: tokenSymbol }))
		} else {
			dispatch(changeToken({ paidToken: tokenSymbol }))
		}

		return () => dispatch(resetTrading())
	}, [tokenSymbol])

	return (
		<TwoColumnLayout>
			<TradingContainer container>
				<Grid className={classes.leftColumn} item lg={8} md={7}>
					<LeftContent>
						<Typography variant="h4" gutterBottom>
							{tokenSymbol} stablecoin
						</Typography>
						<Typography variant="h3">
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
							last {ANNOT[aggregation]}
						</Typography>
						<ChartWrapper>
							{isFetching ? (
								<PropagateLoader size={24} color={theme.palette.text.hint} />
							) : (
								<ResponsiveContainer width="100%" aspect={2.75}>
									<AreaChart data={currentAmount} onMouseLeave={handleChartMouseLeave}>
										<defs>
											<linearGradient id="colorDescrease" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="#f783ac" stopOpacity={0.3} />
												<stop offset="95%" stopColor="#f783ac" stopOpacity={0} />
											</linearGradient>
											<linearGradient id="colorIncrease" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="#47ecad" stopOpacity={0.3} />
												<stop offset="95%" stopColor="#47ecad" stopOpacity={0} />
											</linearGradient>
										</defs>
										<XAxis hide dataKey="time" />
										<YAxis hide type="number" scale="log" domain={['dataMin * 0.1', 'dataMax + 1']} />
										<Tooltip content={() => null} isAnimationActive={false} cursor={{ strokeWidth: 2 }} />
										<Area
											connectNulls
											type="linear"
											dataKey="value"
											stroke={percentage < 0 ? '#f783ac' : '#47ecad'}
											strokeWidth={2}
											fillOpacity={1}
											fill={percentage < 0 ? 'url(#colorDescrease)' : 'url(#colorIncrease)'}
											activeDot={handleDotActive}
										/>
									</AreaChart>
								</ResponsiveContainer>
							)}
						</ChartWrapper>

						{/* Granual selector */}
						<GutterBottom>
							<ToggleButtonGroup value={aggregation} exclusive onChange={handleChangeAggregation}>
								<ToggleButton className={clsx(classes.granualItem, classes.styledButton)} value="1MONTH">
									1M
								</ToggleButton>
								<ToggleButton className={clsx(classes.granualItem, classes.styledButton)} value="6MONTHS">
									6M
								</ToggleButton>
								<ToggleButton className={clsx(classes.granualItem, classes.styledButton)} value="1YEAR">
									1Y
								</ToggleButton>
							</ToggleButtonGroup>
						</GutterBottom>

						<Typography className={classes.titleText} gutterBottom>
							About {tokenSymbol}
						</Typography>
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
