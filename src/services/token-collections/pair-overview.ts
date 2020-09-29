import axios from 'axios'
import { useQuery } from 'react-query'
import { MarketOverViewModel } from 'models/incscan-api'

export const getPairOverwiew = async (): Promise<MarketOverViewModel> => {
	try {
		const res = await axios.get<MarketOverViewModel>('https://api.incscan.io/pdex/overview')

		return res.data
	} catch (error) {
		console.error(error)
	}
	return null
}

export const usePairOverview = () => {
	return useQuery(getPairOverwiew.name, () => getPairOverwiew(), {
		cacheTime: 60 * 60 * 1000,
		refetchOnMount: false,
		refetchInterval: 60 * 60 * 1000,
	})
}
