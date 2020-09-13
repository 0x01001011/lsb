import { TimeValue } from './incscan-api'

export interface TokenUiModel {
	tokenSymbol: string
	tokenName: string
	icon: string
	colors?: Array<string>
	gradients?: Array<string>
}

export type TokenDetailsModel = TokenUiModel & {
	totalSupply: number
	marketCap: number
	oneDayVolume: string
	wiki: string
	currentAmount: TimeValue[]
}
