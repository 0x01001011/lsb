import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelectorForSlice } from 'stores/utils'

const settingState = {
	loading: false,
	error: undefined,
}

export type SettingStateType = typeof settingState

export const settings = createSlice({
	name: 'settings',
	initialState: settingState,
	reducers: {
		setGlobalLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
			state.loading = action.payload.isLoading
		},
	},
})

export const useSettingState = createSelectorForSlice(settings)
