import axios from 'axios'
import { useQuery } from 'react-query'
import { ShieldCoinReceivedModel } from 'models/incscan-api'

const generateUniques = (pairs: string[]) => {
	const uniques = new Set<string>()

	pairs.forEach((pair) => {
		const [first, last] = pair.split('-')
		uniques.add(first)
		uniques.add(last)
	})

	return Array.from(uniques)
}

export const getListPairCandles = async (): Promise<Array<string>> => {
	try {
		const res = await axios.get<Array<string>>('https://api.incscan.io/pdex/pairs')
		return generateUniques(res.data)
	} catch (error) {
		console.error(error)
	}
	return []
}

export const usePairCandles = () => {
	return useQuery('getListPairCandles', () => getListPairCandles())
}
