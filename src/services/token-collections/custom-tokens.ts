import axios from 'axios'
import { useQuery } from 'react-query'
import { CustomTokenReceivedModel } from 'models/incscan-api'
import { TokenUiModel } from 'models/token'
import { queryCache } from 'services/query-cache'

export const getListCustomTokens = async (): Promise<TokenUiModel[]> => {
	try {
		const res = await axios.get<Array<CustomTokenReceivedModel>>('https://api.incscan.io/blockchain/custom-tokens')
		return res.data.map(({ symbol, name, image }) => ({
			tokenSymbol: symbol,
			tokenName: name,
			icon: image,
			colors: ['#f1f1f1', '#303030'],
			gradients: ['rgb(238, 238, 238)', 'rgb(194, 194, 194)'],
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
