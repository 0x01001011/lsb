import axios from 'axios'
import { useQuery } from 'react-query'
import { UsdEvolutionReceived, TimeValue } from 'models/incscan-api'
import { AggregationType } from 'stores/implements/trading'

function getSecondTimestamp() {
	return Math.round(new Date().getTime() / 1000)
}

const DAYS = { '1MONTH': 30, '6MONTHS': 182, '1YEAR': 365 }

export const getUsdEvolution = async (token: string, aggregation: AggregationType) => {
	try {
		const end = getSecondTimestamp()
		const start = end - 86400 * DAYS[aggregation]
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

export const useUsdEvolution = (token: string, aggregation: AggregationType) => {
	return useQuery(`${getUsdEvolution.name}/${token}/${aggregation}`, () => getUsdEvolution(token, aggregation))
}
