import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { createSelectorForSlice } from 'stores/utils'

export interface TradingState {
	paidToken: string
	paidAmount: number
	receivedToken: string
	receivedAmount: number
}

const initialState: TradingState = {
	paidToken: 'PRV',
	paidAmount: 0,
	receivedToken: '',
	receivedAmount: 0,
}

const PRV = 'PRV'

export const trading = createSlice({
	name: 'trading',
	initialState,
	reducers: {
		changeToken(state, action: PayloadAction<{ type: 'pay' | 'receive'; token: string }>) {
			const { type, token } = action.payload

			if (type === 'pay') {
				if (state.paidToken !== PRV && token === PRV) {
					state.receivedToken = state.paidToken
					state.paidToken = token
				} else if (state.paidToken === PRV && token !== PRV) {
					state.receivedToken = state.paidToken
					state.paidToken = token
				} else {
					state.paidToken = token
				}
			}

			if (type === 'receive') {
				if (state.receivedToken !== PRV && token === PRV) {
					state.paidToken = state.receivedToken
					state.receivedToken = token
				} else if (state.receivedToken === PRV && token !== PRV) {
					state.paidToken = state.receivedToken
					state.receivedToken = token
				} else {
					state.receivedToken = token
				}
			}
		},
		changeAmount(state, action: PayloadAction<{ type: 'pay' | 'receive'; amount }>) {
			const { type } = action.payload
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
			state = initialState
		},
	},
})

export const { changeToken, changeAmount, swapTrading, resetTrading } = trading.actions

export const useTradingState: TypedUseSelectorHook<TradingState> = createSelectorForSlice(trading)
