import axios from 'axios'
import { useQuery } from 'react-query'
import { TokenReceivedModel } from 'src/models/incscan-api'

const getListCoinTokens = async () => {
	try {
		const res = await axios.get<Array<TokenReceivedModel>>('https://api.incscan.io/blockchain/tokens')
		return res.data
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useGetListCoinTokens = () => {
	return useQuery(getListCoinTokens.name, () => getListCoinTokens())
}
