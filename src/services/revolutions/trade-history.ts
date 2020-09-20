import axios from 'axios'
import { useQuery } from 'react-query'
import { TradeHistoryModel } from 'models/trade-history'

function reversePair(pair: string) {
	const pairs = pair.split('-')
	return `${pairs[1]}-${pairs[0]}`
}

export const getTradeHistory = async (pair: string, limit: number) => {
	try {
		let url = `https://api.incscan.io/pdex/trades?limit=${limit}&offset=0&pair=${pair}&hideSmallTrades=false`
		let res = await axios.get<{ count: number; result: TradeHistoryModel[] }>(url)

		if (res.data.result.length === 0) {
			url = `https://api.incscan.io/pdex/trades?limit=${limit}&offset=0&pair=${reversePair(pair)}&hideSmallTrades=false`
			res = await axios.get<{ count: number; result: TradeHistoryModel[] }>(url)
		}

		return res.data.result
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useTradeHistory = (pair: string, limit?: number) => {
	return useQuery(`${getTradeHistory.name}/${pair}/${limit}`, () => getTradeHistory(pair, limit || 100), {
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: false,
		refetchInterval: 60 * 60 * 1000,
	})
}
