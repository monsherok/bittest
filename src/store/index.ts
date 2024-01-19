import { configureStore } from '@reduxjs/toolkit'
import { transactionsReducer } from './slices/transactions.slice'
import { uiSliceReducer } from './slices/ui.slice'
import { usersReducer } from './slices/users.slice'

const store = configureStore({
	reducer: {
		users: usersReducer,
		transactions: transactionsReducer,
		ui: uiSliceReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
