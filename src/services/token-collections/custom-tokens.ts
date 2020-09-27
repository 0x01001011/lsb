import axios from 'axios'
import { useQuery } from 'react-query'
import { CustomTokenReceivedModel } from 'models/incscan-api'
import { TokenUiModel } from 'models/token'
import { queryCache } from 'services/query-cache'

export const getListCustomTokens = async (): Promise<TokenUiModel[]> => {
	try {
		const res = await axios.get<Array<CustomTokenReceivedModel>>('https://api.incscan.io/blockchain/custom-tokens')
		return res.data.map((r) => ({
			tokenSymbol: r.symbol,
			tokenName: r.name,
			icon: r.image,
			...r,
		}))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useCustomTokens = () => {
	return useQuery(getListCustomTokens.name, () => getListCustomTokens())
}

export const getCustomTokenFromCache = () => {
	const data = queryCache.getQueryData<TokenUiModel[]>(getListCustomTokens.name)
	if (!data) {
		throw new Error('hook useCustomTokens() should be call before.')
	}
	return data
}
