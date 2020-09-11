import { NowRequest, NowResponse } from '@vercel/node'
import { concat } from 'lodash'
import { setup } from 'axios-cache-adapter'
import { AxiosError } from 'axios'
import { CustomTokenReceivedModel, TokenReceivedModel } from '../src/models/incscan-api'

const api = setup({
	cache: {
		maxAge: 30 * 1000,
		readOnError: (error: AxiosError) => {
			return error.response.status >= 400 && error.response.status < 600
		},
		clearOnStale: true,
	},
})

export interface TokenItemInterface {
	id: number
	tokenId: string
	symbol: string
	originalSymbol: string
	name: string
	contractId?: string
	decimals: number
	pDecimals: number
	status: number
	type: number
	currencyType: number
	pSymbol: string
	isDefault: boolean
	verified: boolean
	tokenType: 'TOKEN' | 'SHIELD' | 'CUSTOM'
}

export default async function (req: NowRequest, res: NowResponse) {
	const tokens = await api.get<Array<TokenReceivedModel>>('https://api.incscan.io/blockchain/tokens')
	const customTokens = await api.get<Array<CustomTokenReceivedModel>>('https://api.incscan.io/blockchain/custom-tokens')

	const tokensMapped = tokens.data.map<TokenItemInterface>((i) => ({
		tokenType: 'TOKEN',
		...i,
	}))

	const customTokenMapped = customTokens.data.map<TokenItemInterface>((i) => ({
		tokenType: 'CUSTOM',
		...i,
		originalSymbol: i.symbol,
		isDefault: false,
		decimals: 0,
		pDecimals: 0,
		status: 0,
		type: 0,
		currencyType: 0,
		pSymbol: i.symbol,
	}))

	res.json(concat(tokensMapped, customTokenMapped))
}
