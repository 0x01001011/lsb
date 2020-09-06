import axios from 'axios'
import { useQuery } from 'react-query'
import { ShieldCoinReceivedModel } from 'src/models/incscan-api'
import { TokenUiModel } from 'src/models/token'

const getListShieldedCoins = async (): Promise<TokenUiModel[]> => {
	try {
		const res = await axios.get<Array<ShieldCoinReceivedModel>>('https://api.incscan.io/shielded-coins')
		return res.data.map(({ token, tokenName }) => ({
			tokenSymbol: token,
			tokenName,
			icon: `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${token
				.substr(1, token.length - 1)
				.toLowerCase()}@2x.png`,
			gradients: ['rgb(238, 238, 238)', 'rgb(194, 194, 194)'],
		}))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useShieldCoins = () => {
	return useQuery(getListShieldedCoins.name, () => getListShieldedCoins())
}
