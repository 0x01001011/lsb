import { useQuery } from 'react-query'
import { TokenUiModel } from 'src/models/token'
import { getListCoinTokens } from './coin-tokens'
import { getListShieldedCoins } from './shielded-coins'
import { getListCustomTokens } from './custom-tokens'

const getListTokens = async (variant: string): Promise<TokenUiModel[]> => {
	try {
		if (variant === 'coin') {
			return getListCoinTokens()
		}
		if (variant === 'shielded') {
			return getListShieldedCoins()
		}
		if (variant === 'custom') {
			return getListCustomTokens()
		}
		// eslint-disable-next-line quotes
		throw new Error(`Invalid token variant. Must be one of 'coin' | 'shielded' | 'custom'`)
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useTokenInfos = (variant: string) => {
	return useQuery(`getListTokens(${variant})`, () => getListTokens(variant))
}
