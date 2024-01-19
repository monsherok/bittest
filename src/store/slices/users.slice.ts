import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { IApiResponse, UsersState } from '../../interfaces/users.interface'

export const fetchUsers = createAsyncThunk<IApiResponse, void>(
	'users/fetchUsers',
	async () => {
		const { data } = await axios.get('/user/list')
		return data
	}
)

const initialState: UsersState = {
	users: [],
	filteredUsers: [],
	status: 'loading',
	sortOrder: 'asc',
	filter: '',
	page: 1,
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		sortUsersByTokens: state => {
			state.filteredUsers.sort((a, b) => {
				const tokensA = a.subscription.tokens
				const tokensB = b.subscription.tokens
				return state.sortOrder === 'asc' ? tokensA - tokensB : tokensB - tokensA
			})
			state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
		},
		setFilter: (state, action) => {
			state.filter = action.payload
			state.filteredUsers = state.users.filter(user =>
				user.name.toLowerCase().includes(state.filter.toLowerCase())
			)
		},
		changePage: (state, action) => {
			state.page = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, (state, action) => {
				state.users = []
				state.status = 'loading'
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload.data
				state.filteredUsers = action.payload.data
				state.status = 'loaded'
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.users = []
				state.status = 'error'
			})
	},
})

export const { sortUsersByTokens, setFilter, changePage } = usersSlice.actions
export const usersReducer = usersSlice.reducer
