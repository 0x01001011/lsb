import axios from 'axios'
import { useQuery } from 'react-query'
import { TokenReceivedModel } from 'models/incscan-api'
import { TokenUiModel } from 'models/token'
import { queryCache } from 'services/query-cache'

export const getListCoinTokens = async (): Promise<TokenUiModel[]> => {
	try {
		const res = await axios.get<Array<TokenReceivedModel>>('https://api.incscan.io/blockchain/tokens')
		return res.data.map((r) => {
			return {
				tokenSymbol: r.pSymbol,
				tokenName: r.name,
				icon: `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${r.symbol.toLowerCase()}@2x.png`,
				...r,
			}
		})
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useCoinTokens = () => {
	return useQuery(getListCoinTokens.name, () => getListCoinTokens())
}
