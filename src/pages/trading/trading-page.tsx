import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { TwoColumnLayout } from 'components/layouts/two-column-layout'
import { useUsdEvolution } from 'services/revolutions'
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts'
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
	}),
)

export const TradingPage = () => {
	const { tokenSymbol } = useParams<{ tokenSymbol: string }>()
	const { isFetching, data, error } = useUsdEvolution(tokenSymbol, 'month')
	const classes = useStyles()
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

	return (
		<TwoColumnLayout>
			<TradingContainer container>
				<Grid className={classes.leftColumn} item lg={8} md={7}>
					<LeftContent>
						<Typography variant="h4" gutterBottom>
							{tokenSymbol} stablecoin
						</Typography>
						<Typography variant="h3" gutterBottom>
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
							last 30 days
						</Typography>

						{!isFetching && (
							<ResponsiveContainer width="100%" aspect={2.0}>
								<AreaChart data={currentAmount} onMouseLeave={handleChartMouseLeave}>
									<defs>
										<linearGradient id="colorDescrease" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#f783ac" stopOpacity={0.6} />
											<stop offset="95%" stopColor="#f783ac" stopOpacity={0} />
										</linearGradient>
										<linearGradient id="colorIncrease" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#47ecad" stopOpacity={0.6} />
											<stop offset="95%" stopColor="#47ecad" stopOpacity={0} />
										</linearGradient>
									</defs>
									<XAxis hide dataKey="time" />
									<YAxis hide type="number" scale="log" domain={['auto', 'auto']} />
									<Tooltip content={() => null} isAnimationActive={false} cursor={{ strokeWidth: 2 }} />
									<Area
										connectNulls
										type="linear"
										dataKey="value"
										stroke={percentage < 0 ? '#f783ac' : '#47ecad'}
										strokeWidth={2}
										fillOpacity={1}
										fill={percentage < 0 ? 'url(#colorDescrease)' : 'url(#colorIncrease)'}
										dot={false}
										activeDot={handleDotActive}
									/>
								</AreaChart>
							</ResponsiveContainer>
						)}
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
