import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelectorForSlice } from 'stores/utils'

const settingState = {
	selectedTab: 0,
}

export const accountPages = createSlice({
	name: 'accountPages',
	initialState: settingState,
	reducers: {
		selectTab(state, action: PayloadAction<{ tabNum: number }>) {
			state.selectedTab = action.payload.tabNum
		},
	},
})

export const useAccountPageState = createSelectorForSlice(accountPages)
