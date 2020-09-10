import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { createSelectorForSlice } from 'stores/utils'

export type ShowOptionType = 'A-Z' | 'Market Capacity' | 'Top Mover' | 'Volume'
export type TokenVariantType = 'Coins' | 'Shielded Tokens' | 'Custom Tokens'

export interface ShowroomState {
	showOption: ShowOptionType
	tokenVariant: TokenVariantType
	pageId: number
	maxPages: number
	batchSize: number
}

const initialState: ShowroomState = {
	showOption: 'Market Capacity',
	tokenVariant: 'Shielded Tokens',
	pageId: 0,
	maxPages: 0,
	batchSize: 16,
}

export const showroom = createSlice({
	name: 'showroom',
	initialState,
	reducers: {
		sortsWith(state, action: PayloadAction<{ option: ShowOptionType }>) {
			const { option } = action.payload
			state.showOption = option
		},
		changeTokenVariant(state, action: PayloadAction<{ variant: TokenVariantType }>) {
			const { variant } = action.payload
			state.tokenVariant = variant
		},
		fetchMore(state) {
			state.pageId += 1
		},
		refreshShowroom(state, action: PayloadAction<{ dataSize: number }>) {
			const { dataSize } = action.payload
			state.pageId = 0
			state.maxPages = Math.ceil(dataSize / state.batchSize)
		},
	},
})

export const { sortsWith, changeTokenVariant, fetchMore, refreshShowroom } = showroom.actions

export const useShowroomRedux: TypedUseSelectorHook<ShowroomState> = useSelector
export const useShowRoomState: TypedUseSelectorHook<ShowroomState> = createSelectorForSlice(showroom)
