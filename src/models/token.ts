import { TimeValue } from './incscan-api'

export interface TokenUiModel {
	tokenSymbol: string
	tokenName: string
	icon: string
	colors?: Array<string>
	gradients?: Array<string>
}

export interface PairCandleStickModel {
	time: any
	open: number
	close: number
	hight: number
	low: number
}
