/* eslint-disable no-inner-declarations */
import { useQuery } from 'react-query'
import { TokenUiModel } from 'src/models/token'
import { getListCoinTokens } from './coin-tokens'
import { getListShieldedCoins } from './shielded-coins'
import { getListCustomTokens } from './custom-tokens'

const getListTokens = async (variant: string): Promise<TokenUiModel[]> => {
	try {
		if (variant === 'Coins') {
			return getListCoinTokens()
		}
		if (variant === 'Shielded Tokens') {
			return getListShieldedCoins()
		}
		if (variant === 'Custom Tokens') {
			return getListCustomTokens()
		}
		if (variant === 'Ally') {
			const tokenInfos = (await getListCoinTokens()).concat(await getListShieldedCoins(), await getListCustomTokens())
			const tokens = []
			const filterOption = (info: TokenUiModel) => {
				if (tokens.includes(info.tokenSymbol)) return false
				tokens.push(info.tokenSymbol)
				return true
			}
			return tokenInfos.filter((info) => filterOption(info))
		}
		// eslint-disable-next-line quotes
		throw new Error(`Invalid token variant. Must be one of 'Coins' | 'Shielded Tokens' | 'Custom Tokens'`)
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useTokenInfos = (variant: string) => {
	return useQuery(`getListTokens(${variant})`, () => getListTokens(variant))
}
