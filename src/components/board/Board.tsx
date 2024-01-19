import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { fetchUsers } from '../../store/slices/users.slice'
import Pagination from '../pagination/Pagination'
import Search from '../search/Search'

import Table from '../table/Table'

function Board() {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	return (
		<Grid item bgcolor={'#121825'} className='rounded-[17px] flex-col'>
			<h2 className='py-6 px-[34px]'>Моя организация</h2>
			<div className='border-b border-[#222B44] w-full'></div>
			<Search />
			<Table />
			<Pagination />
		</Grid>
	)
}

export default Board
