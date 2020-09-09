import axios from 'axios'
import { useQuery } from 'react-query'
import { UsdEvolutionReceived, TimeValue } from 'src/models/incscan-api'

function getSecondTimestamp() {
	return Math.round(new Date().getTime() / 1000)
}

export const getUsdEvolution = async (token: string, aggregation: 'all' | 'month') => {
	try {
		const end = getSecondTimestamp()
		const start = aggregation === 'all' ? 1572566400 : end - 86400 * 30
		let url = `https://api.incscan.io/shielded-coins/usd-evolution/${token}?start=${start}&end=${end}`

		if (token === 'PRV') {
			url = `https://api.incscan.io/privacy-coin/usd-evolution?start=${start}&end=${end}`
			const res = await axios.get<TimeValue[]>(url)
			return {
				currentAmount: res.data,
				perDayAmount: res.data,
				totalAmount: res.data,
			}
		}

		const res = await axios.get<UsdEvolutionReceived>(url)

		return res.data
	} catch (error) {
		console.error(error)
	}
	return {
		currentAmount: [],
		perDayAmount: [],
		totalAmount: [],
	}
}

export const useUsdEvolution = (token: string, aggregation: 'all' | 'month') => {
	return useQuery(`${getUsdEvolution.name}(${token})`, () => getUsdEvolution(token, aggregation))
}
