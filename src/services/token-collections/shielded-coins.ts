import axios from 'axios'
import { useQuery } from 'react-query'
import { ShieldCoinReceivedModel } from 'models/incscan-api'
import { TokenUiModel } from 'models/token'

export const getListShieldedCoins = async (): Promise<TokenUiModel[]> => {
	try {
		const res = await axios.get<Array<ShieldCoinReceivedModel>>('https://api.incscan.io/shielded-coins')
		return res.data.map((r) => {
			const basename = r.token.substr(1, r.token.length - 1).toLowerCase()
			return {
				tokenSymbol: r.token,
				tokenName: r.tokenName,
				icon: `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${basename}@2x.png`,
				tokenId: '',
			}
		})
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useShieldCoins = () => {
	return useQuery(getListShieldedCoins.name, () => getListShieldedCoins())
}
