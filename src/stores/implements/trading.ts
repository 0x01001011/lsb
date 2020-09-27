import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { createSelectorForSlice } from 'stores/utils'

export interface TradingState {
	paidToken: string
	paidAmount: number
	receivedToken: string
	receivedAmount: number
	aggregation: AggregationType
	granuality: PairCandleGranuality
}

export type AggregationType = '1MONTH' | '6MONTHS' | '1YEAR'

export type PairCandleGranuality = '1HOUR' | '6HOURS' | '1DAY'

const initialState: TradingState = {
	paidToken: '',
	paidAmount: 0,
	receivedToken: '',
	receivedAmount: 0,
	aggregation: '1MONTH',
	granuality: '1DAY',
}

export const trading = createSlice({
	name: 'trading',
	initialState,
	reducers: {
		changeToken(state, action: PayloadAction<{ paidToken?: string; receivedToken?: string }>) {
			const { paidToken, receivedToken } = action.payload
			state.paidToken = paidToken || ''
			state.receivedToken = receivedToken || ''
		},
		changeAmount(state, action: PayloadAction<{ paid: number; received: number }>) {
			const { paid, received } = action.payload
			state.paidAmount = paid
			state.receivedAmount = received
		},
		changeAggregation(state, action: PayloadAction<{ aggregation: AggregationType }>) {
			const { aggregation } = action.payload
			state.aggregation = aggregation
		},
		changeGranuality(state, action: PayloadAction<{ granuality: PairCandleGranuality }>) {
			const { granuality } = action.payload
			state.granuality = granuality
		},
		swapTrading(state) {
			const swapToken = state.paidToken
			state.paidToken = state.receivedToken
			state.receivedToken = swapToken

			const swapAmount = state.paidAmount
			state.paidAmount = state.receivedAmount
			state.receivedAmount = swapAmount
		},
		resetTrading(state) {
			Object.assign(state, { ...initialState })
		},
	},
})

export const {
	changeToken,
	changeAmount,
	swapTrading,
	resetTrading,
	changeAggregation,
	changeGranuality,
} = trading.actions

export const useTradingState: TypedUseSelectorHook<TradingState> = createSelectorForSlice(trading)
