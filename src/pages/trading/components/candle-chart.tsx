import React from 'react'
import { createChart, ChartOptions, IChartApi } from 'lightweight-charts'
import { useWindowSize } from 'utils/hooks'
import { TokenUiModel } from 'models/token'
import { useCandleSticks } from 'services/revolutions'
import { useTradingState } from 'stores/implements/trading'
import { PropagateLoader } from 'react-spinners'

export type CandleChartProps = {
	firstToken: string
	secondToken: string
}

export const CandleChart = React.memo(({ firstToken, secondToken }: CandleChartProps) => {
	// const { tokenSymbol: symbolSt, tokenName: nameSt, icon: iconSt } = firstToken
	// const { tokenSymbol: symbolNd, tokenName: nameNd, icon: iconNd } = secondToken
	const windowSize = useWindowSize()

	const ref = React.useRef()
	const chartRef = React.useRef<IChartApi>()
	const granuality = useTradingState((s) => s.granuality)
	const { isFetching, data } = useCandleSticks(`${firstToken}-${secondToken}`, granuality)

	React.useEffect(() => {
		console.log({ ref, data })
		if (data === undefined || !ref.current) return
		const chart = createChart(ref.current, { width: 600, height: 450 })
		chart.applyOptions({
			timeScale: {
				rightOffset: 5,
				barSpacing: 15,
				lockVisibleTimeRangeOnResize: true,
				rightBarStaysOnScroll: true,
				borderVisible: true,
				fixLeftEdge: true,
				borderColor: '#e3eaf6',
				visible: true,
				timeVisible: true,
				secondsVisible: false,
			},
			crosshair: {
				vertLine: {
					color: '#9ca9cf',
					width: 1,
					style: 0,
					visible: true,
					labelVisible: true,
				},
				horzLine: {
					color: '#9ca9cf',
					width: 1,
					style: 0,
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
				borderColor: '#294698',
				scaleMargins: {
					top: 0.2,
					bottom: 0.1,
				},
			},
			grid: {
				vertLines: {
					color: '#e3eaf6',
					style: 4,
					visible: false,
				},
				horzLines: {
					color: '#e3eaf6',
					style: 3,
					visible: true,
				},
			},
			layout: {
				backgroundColor: 'transparent',
				fontSize: 14,
				// eslint-disable-next-line quotes
				fontFamily: "'Montserrat', sans-serif",
				textColor: '#9ca9cf',
			},
		})

		const candlestickSeries = chart.addCandlestickSeries({
			upColor: '#294698',
			downColor: '#e0525f',
			wickVisible: true,
			borderVisible: false,
			wickUpColor: '#294698',
			wickDownColor: '#e0525f',
		})
		candlestickSeries.setData(data)

		const histogram = data.map(({ time, open, close }) => ({
			time,
			value: close,
			// color: open < close ? '#34f49030' : '#f3383830',
			color: '#9ca9cf',
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

		// const firstLineData = data.map(({ time, high }) => ({
		// 	time,
		// 	value: high,
		// }))

		// const secondLineData = data.map(({ time, low }) => ({
		// 	time,
		// 	value: low,
		// }))

		// const firstLineSeries = chart.addLineSeries({
		// 	color: '#29469833',
		// 	lineStyle: 0,
		// 	lineWidth: 1,
		// 	crosshairMarkerVisible: true,
		// 	crosshairMarkerRadius: 2,
		// 	lineType: 0,
		// })

		// firstLineSeries.setData(firstLineData)

		// const secondLineSeries = chart.addLineSeries({
		// 	color: '#e0525f33',
		// 	lineStyle: 0,
		// 	lineWidth: 1,
		// 	crosshairMarkerVisible: true,
		// 	crosshairMarkerRadius: 2,
		// 	lineType: 0,
		// })

		// secondLineSeries.setData(secondLineData)

		chartRef.current = chart

		return () => {
			chart.removeSeries(candlestickSeries)
			// chart.removeSeries(firstLineSeries)
			// chart.removeSeries(secondLineSeries)
			chart.removeSeries(histogramSeries)
			chart.remove()
		}
	}, [data])

	React.useEffect(() => {
		if (chartRef.current) {
			const { width, height } = windowSize

			if (width > 1280) {
				chartRef.current.resize(600, 450)
			} else if (width > 960) {
				chartRef.current.resize(0.49 * width, 0.75 * 0.49 * width)
			} else {
				chartRef.current.resize(0.9 * width, 0.75 * 0.9 * width)
			}
		}
	}, [windowSize, chartRef])

	return <div ref={ref} id="candle-chart" />
})
