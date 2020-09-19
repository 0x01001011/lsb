import axios from 'axios'
import { useQuery } from 'react-query'
import { PairCandleStickModel } from 'models/token'
import { PairCandleGranuality } from 'stores/implements/trading'

function getSecondTimestamp() {
	return Math.round(new Date().getTime() / 1000)
}

function getDdMmYyyy(timestamp: number) {
	const date = new Date(timestamp)
	return { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }
}

function reversePair(pair: string) {
	const pairs = pair.split('-')
	return `${pairs[1]}-${pairs[0]}`
}

const GRANUALITES = { '1HOUR': 3600, '6HOURS': 21600, '1DAY': 86400 }

export const getCandleSticks = async (pair: string, granuality: PairCandleGranuality) => {
	try {
		const end = getSecondTimestamp()
		let url = `https://api.incscan.io/pdex/candles/${pair}?granularity=${GRANUALITES[granuality]}&start=1568551184&end=${end}&reversed=false`
		let res = await axios.get<Array<PairCandleStickModel>>(url)

		if (res.data.length === 0) {
			url = `https://api.incscan.io/pdex/candles/${reversePair(pair)}?granularity=${
				GRANUALITES[granuality]
			}&start=1568551184&end=${end}&reversed=true`
			res = await axios.get<Array<PairCandleStickModel>>(url)
		}

		return res.data.map((candle: PairCandleStickModel) => ({
			...candle,
			time: getDdMmYyyy(candle.time * 1000),
		}))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useCandleSticks = (pair: string, granuality: PairCandleGranuality) => {
	return useQuery(`${getCandleSticks.name}/${pair}/${granuality}`, () => getCandleSticks(pair, granuality), {
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: false,
		refetchInterval: 10000,
	})
}
