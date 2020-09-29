import axios from 'axios'
import { useQuery } from 'react-query'
import { PairDetail } from 'models/token'

export const getPairDetails = async (): Promise<PairDetail[]> => {
	try {
		const res = await axios.get<{ data: PairDetail[] }>('https://swap.lightshadowbox.app/api/get-pairs-list')

		return res.data.data
	} catch (error) {
		console.error(error)
	}
	return []
}

export const usePairDetails = () => {
	return useQuery(getPairDetails.name, () => getPairDetails(), {
		cacheTime: 60 * 60 * 1000,
		refetchOnMount: false,
		refetchInterval: 60 * 60 * 1000,
	})
}
