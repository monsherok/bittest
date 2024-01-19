import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		drawerOpen: false,
	},
	reducers: {
		toggleDrawer: (state, action) => {
			state.drawerOpen = action.payload
		},
	},
})

export const { toggleDrawer } = uiSlice.actions
export const uiSliceReducer = uiSlice.reducer
export default uiSlice.reducer
