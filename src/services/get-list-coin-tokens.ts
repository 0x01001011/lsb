import axios from 'axios'
import { useQuery } from 'react-query'

export interface ListCoinTokenRes {
	id: number
	createdAt: string
	updatedAt: string
	deletedAt: string
	tokenId: string
	symbol: string
	originalSymbol: string
	name: string
	contractId: string
	decimals: number
	pDecimals: number
	status: number
	type: number
	currencyType: number
	pSymbol: string
	isDefault: boolean
	userId: string
	verified: boolean
}

export const getListCoinToke = async () => {
	try {
		const res = await axios.get<Array<ListCoinTokenRes>>('https://api.incscan.io/blockchain/tokens')
		return res.data
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useGetListCoinToken = () => {
	return useQuery(getListCoinToke.name, () => getListCoinToke())
}
