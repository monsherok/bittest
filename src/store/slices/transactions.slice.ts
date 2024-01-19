// transactions.slice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { ITransaction } from '../../interfaces/transactions.interface'

export const fetchTransactions = createAsyncThunk(
	'transactions/fetchTransactions',
	async (userId: string) => {
		const response = await axios.get(`/user/${userId}/transactions`)
		return response.data
	}
)

interface TransactionsState {
	transactions: ITransaction[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: TransactionsState = {
	transactions: [],
	status: 'idle',
	error: null,
}

const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchTransactions.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.transactions = action.payload
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || null
			})
	},
})

export const transactionsReducer = transactionsSlice.reducer
export const {} = transactionsSlice.actions
export default transactionsSlice.reducer
