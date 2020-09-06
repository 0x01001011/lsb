import axios from 'axios'
import { useQuery } from 'react-query'
import { TokenReceivedModel } from 'src/models/incscan-api'
import { TokenUiModel } from 'src/models/token'

export const getListCoinTokens = async (): Promise<TokenUiModel[]> => {
	try {
		const res = await axios.get<Array<TokenReceivedModel>>('https://api.incscan.io/blockchain/tokens')
		return res.data.map(({ name, pSymbol, symbol }) => {
			return {
				tokenSymbol: pSymbol,
				tokenName: name,
				icon: `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${symbol.toLowerCase()}@2x.png`,
				gradients: ['rgb(238, 238, 238)', 'rgb(194, 194, 194)'],
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
