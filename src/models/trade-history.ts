export interface TradeHistoryModel {
	time: Date
	baseAmount: number
	buyOrSell: string
	pair: string
	quoteAmount: number
	price: string
}
