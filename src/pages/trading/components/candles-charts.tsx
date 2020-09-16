import React from 'react'
import { createChart, ChartOptions } from 'lightweight-charts'
import { useTheme } from '@material-ui/core'

export const CandlesChart = ({ lastCandle }) => {
	const chartRef = React.useRef()
	const theme = useTheme()

	React.useEffect(() => {
		const chart = createChart(chartRef.current, { width: 700, height: 400 })
		chart.applyOptions({
			timeScale: {
				rightOffset: 5,
				barSpacing: 15,
				lockVisibleTimeRangeOnResize: true,
				rightBarStaysOnScroll: true,
				borderVisible: false,
			},
			crosshair: {
				vertLine: {
					color: '#303030',
					width: 1,
					style: 3,
					visible: true,
					labelVisible: true,
				},
				horzLine: {
					color: '#303030',
					width: 1,
					style: 3,
					visible: true,
					labelVisible: true,
				},
			},
			rightPriceScale: {
				// mode: 1,
				autoScale: true,
				// invertScale: true,
				alignLabels: true,
				borderVisible: false,
				borderColor: '#555ffd',
				scaleMargins: {
					top: 0.2,
					bottom: 0.1,
				},
			},
			grid: {
				vertLines: {
					color: '#30303030',
					style: 0,
					visible: false,
				},
				horzLines: {
					color: '#30303030',
					style: 0,
					visible: false,
				},
			},
			layout: {
				backgroundColor: theme.palette.background.default,
				fontSize: 14,
				// eslint-disable-next-line quotes
				fontFamily: "'Signika', sans-serif",
			},
		})

		const candlestickSeries = chart.addCandlestickSeries({
			upColor: '#34f490',
			downColor: '#f33838',
		})
		candlestickSeries.setData(lastCandle)

		const histogram = lastCandle.map(({ time, open, close }) => ({
			time,
			value: close,
			// color: open < close ? '#34f49077' : '#d5000077',
			color: '#30303077',
		}))

		const histogramSeries = chart.addHistogramSeries({
			priceFormat: {
				type: 'volume',
			},
			priceScaleId: '',
			scaleMargins: {
				top: 0.9,
				bottom: 0,
			},
		})

		histogramSeries.setData(histogram)

		return () => {
			chart.removeSeries(candlestickSeries)
			chart.removeSeries(histogramSeries)
			chart.remove()
		}
	}, [])

	return (
		<>
			<div ref={chartRef} id="candle-chart" />
		</>
	)
}
