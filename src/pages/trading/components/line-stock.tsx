import React from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'
import { AggregationType, changeAggregation, useTradingState } from 'stores/implements/trading'
import { useUsdEvolution } from 'services/revolutions'
import { Typography } from '@material-ui/core'
import { TokenUiModel } from 'models/token'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import { PropagateLoader } from 'react-spinners'

export type LineStockProps = {
	token: TokenUiModel
}

const initialMetrics = {
	properRecords: [],
	min: 0,
	max: 0,
	last: 0,
	percentage: 0,
	amount: 0,
	timestamp: 0,
}

const ANNOT = { '1MONTH': '30 days', '6MONTHS': '6 months', '1YEAR': '12 months' }

const StyledTooltip = (props) => {
	const { point } = props
	const { data } = point

	return <OnTop>{data.xFormatted}</OnTop>
}

const OnTop = styled.p`
	font-weight: 700;
	padding-bottom: 5vw;
`

export const LineStock = React.memo(({ token }: LineStockProps) => {
	const dispatch = useDispatch()
	const [metrics, setMetrics] = React.useState(initialMetrics)

	const { properRecords, percentage, last, min, max, amount, timestamp } = metrics
	const { tokenSymbol, tokenName } = token
	const { aggregation } = useTradingState((state) => state)
	const { isFetching, data } = useUsdEvolution(tokenSymbol, aggregation)

	/* Handling method */
	const handleChartMouseLeave = () => {
		if (properRecords && properRecords.length > 0) {
			const { time, value } = properRecords[properRecords.length - 1]
			setMetrics({ ...metrics, amount: Number(value), timestamp: Number(time) })
		}
	}

	const handleChartMouseMove = (point, event) => {
		const { x, y } = point.data
		setMetrics({ ...metrics, amount: y, timestamp: x })
	}

	const handleChangeAggregation = (event: React.MouseEvent<HTMLElement>, value: AggregationType) => {
		dispatch(changeAggregation({ aggregation: value }))
	}

	/* Proper received data */
	React.useEffect(() => {
		const { currentAmount } = data || { currentAmount: [{ time: 0, value: 0 }] }
		const properRecords = currentAmount.filter(({ value }) => value)
		let percentage = 0
		let last = 0
		let min = 0
		let max = 0

		if (properRecords.length > 0) {
			min = Math.min(...properRecords.map(({ value }) => value))
			max = Math.max(...properRecords.map(({ value }) => value))
			last = Number(properRecords[properRecords.length - 1].value)
			const first = Number(properRecords[0].value)
			percentage = first === 0 ? 0 : (last - first) / first
		}

		setMetrics({ ...metrics, properRecords, percentage, last, min, max })
		console.log('Update metrics', { metrics })
	}, [data])

	return (
		<>
			<Typography variant="h4" gutterBottom>
				{tokenName} ({tokenSymbol})
			</Typography>
			<Typography variant="h3" component="div">
				<span>$</span>
				<span>{isFetching ? '-' : amount.toFixed(2)} </span>
				<Timestamp>{` (${new Date(timestamp * 1000).toLocaleString('vi-VN')})`}</Timestamp>
			</Typography>
			<Typography gutterBottom component="div">
				{!isFetching && (
					<span
						style={{
							color: percentage < 0 ? '#e0525f' : '#1d8f74',
						}}
					>
						{percentage > 0 && '+'}
						{percentage.toFixed(2)}%
					</span>
				)}
				<span style={{ color: '#303030' }}> last {ANNOT[aggregation]}</span>
			</Typography>
			<ChartWrapper>
				{isFetching ? (
					<PropagateLoader size={24} />
				) : (
					<ResponsiveLine
						data={
							properRecords
								? [
										{
											id: '',
											color: '',
											data: properRecords.map(({ time, value }) => ({ x: Number(time), y: Number(value) })),
										},
								  ]
								: []
						}
						xScale={{ type: 'point' }}
						xFormat={(value: number) => new Date(value * 1000).toUTCString()}
						yScale={{ type: 'linear', min: 2 * min - max, max: 2 * max - min, stacked: true, reverse: false }}
						axisTop={null}
						axisRight={null}
						axisBottom={null}
						axisLeft={null}
						enableGridX={false}
						enableGridY={false}
						colors={percentage < 0 ? '#e0525f' : '#1d8f74'}
						enablePoints={false}
						onMouseLeave={handleChartMouseLeave}
						onMouseMove={handleChartMouseMove}
						tooltip={StyledTooltip}
						useMesh
						animate={false}
						crosshairType="x"
						legends={[]}
						enableArea
						curve="linear"
						defs={[
							linearGradientDef('gradientA', [
								{ offset: 0, color: 'inherit', opacity: 0.3 },
								{ offset: 90, color: 'inherit', opacity: 0 },
							]),
						]}
						fill={[{ match: '*', id: 'gradientA' }]}
					/>
				)}
			</ChartWrapper>
			<GranualSelector>
				<ToggleButtonGroup value={aggregation} exclusive onChange={handleChangeAggregation}>
					<GranualButton value="1MONTH">1M</GranualButton>
					<GranualButton value="6MONTHS">6M</GranualButton>
					<GranualButton value="1YEAR">1Y</GranualButton>
				</ToggleButtonGroup>
			</GranualSelector>
		</>
	)
})

const Timestamp = styled.span`
	font-size: 1.2rem;
`

const ChartWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 25vw;
	overflow: hidden;
	margin-bottom: 16px;
`

const GranualButton = styled(ToggleButton)`
	justify-self: flex-end;
	align-self: center;
	border: none;
	padding: 0px 11px;

	&.MuiButton-root {
		text-transform: none;
		justify-content: center;

		&:hover {
			background: transparent;
		}
	}
`

const GranualSelector = styled.div`
	display: flex;
	justify-content: flex-end;
`
