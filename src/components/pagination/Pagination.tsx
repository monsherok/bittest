import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Pagination as PagePagination, PaginationItem } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { changePage } from '../../store/slices/users.slice'

function Pagination() {
	const dispatch = useDispatch<AppDispatch>()
	const { users, filteredUsers } = useSelector(
		(state: RootState) => state.users
	)

	const handleChange = (
		event: React.ChangeEvent<unknown>,
		pageCurrent: number
	) => {
		dispatch(changePage(pageCurrent))
	}

	const maxPage = filteredUsers ? Math.ceil(filteredUsers.length / 10) : 1

	return (
		<div className='my-5'>
			<PagePagination
				count={maxPage}
				onChange={handleChange}
				sx={[
					{
						'.css-wjh20t-MuiPagination-ul': {
							justifyContent: 'center',
						},
					},
				]}
				renderItem={users => (
					<PaginationItem
						slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
						sx={[
							{
								backgroundColor: 'transparent',
								borderRadius: '8px',
								color: 'white',
								fontSize: '16px',
							},
							{
								'&.Mui-selected': {
									backgroundColor: '#1C64F2',
								},
							},
							{
								'&.Mui-selected:hover': {
									backgroundColor: '#1C64F2',
									opacity: 0.9,
								},
							},
							{
								'&:hover': {
									color: 'white',
									backgroundColor: '#1C64F2',
									opacity: 0.7,
								},
							},
						]}
						{...users}
					/>
				)}
			/>
		</div>
	)
}

export default Pagination
