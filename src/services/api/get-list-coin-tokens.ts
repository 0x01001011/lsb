import { useQuery } from 'react-query'
import { httpClient } from '../http'

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

export const getListCoinToken = async () => {
  try {
    const res = await httpClient.get<Array<ListCoinTokenRes>>('ptoken/list')
    const customRes = await httpClient.get<Array<ListCoinTokenRes>>('pcustomtoken/list')
    console.log(customRes.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
  return []
}

export const useGetListCoinToken = () => {
  return useQuery(getListCoinToken.name, () => getListCoinToken())
}
