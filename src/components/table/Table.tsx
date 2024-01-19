import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import SouthIcon from '@mui/icons-material/South'
import { Skeleton, TableHead } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { IUser } from '../../interfaces/users.interface'
import { AppDispatch, RootState } from '../../store'
import { fetchTransactions } from '../../store/slices/transactions.slice'
import { toggleDrawer } from '../../store/slices/ui.slice'
import { sortUsersByTokens } from '../../store/slices/users.slice'

interface TableHead {
	name: string
	is_sorted: boolean
}

const tableHeads: readonly TableHead[] = [
	{ name: 'Email', is_sorted: false },
	{ name: 'Имя', is_sorted: false },
	{ name: 'Роль', is_sorted: false },
	{ name: 'Подписка', is_sorted: false },
	{ name: 'Токены', is_sorted: true },
	{ name: 'Действия', is_sorted: false },
]

function Table() {
	const dispatch = useDispatch<AppDispatch>()

	const { filteredUsers, status, sortOrder, page } = useSelector(
		(state: RootState) => state.users
	)

	const handleToggleSortOrder = () => {
		dispatch(sortUsersByTokens())
	}

	const style = `max-h-[15px] max-w-[13.5px] w-full h-full ml-1 cursor-pointer ${
		sortOrder === 'asc' ? '' : 'rotate-180'
	}`
	const currentPage = page * 10

	const handleClick = (userId: string) => {
		dispatch(toggleDrawer(true))
		dispatch(fetchTransactions(userId))
	}

	const thisWasNotInTheTestTask = (event: React.MouseEvent<SVGSVGElement>) => {
		event.stopPropagation()
		alert('Этого не было в тестовом задании')
	}

	return (
		<table className='px-[34px] grid grid-flow-row text-sm'>
			<thead>
				<tr className='bg-[#0E0C15] grid grid-cols-6 rounded-lg'>
					{tableHeads.map(tableHead => (
						<th key={tableHead.name} className='py-[14px] text-[#9CA3AF]'>
							{tableHead.name}
							{tableHead.is_sorted ? (
								<SouthIcon onClick={handleToggleSortOrder} className={style} />
							) : null}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{status === 'loading'
					? Array.from({ length: 10 }).map((item, index) => (
							<tr
								key={index}
								className='text-white grid grid-cols-6 border-b border-[#222B44] w-full py-[23px]  hover:bg-[#222B44] cursor-pointer transition-all'
							>
								{Array.from({ length: 6 }).map((item, index) => (
									<th key={index}>
										<Skeleton
											variant='text'
											animation='wave'
											sx={{ fontSize: '1rem' }}
										/>
									</th>
								))}
							</tr>
					  ))
					: filteredUsers
							.slice(currentPage - 10, currentPage)
							.map((user: IUser) => (
								<tr
									key={user.id}
									className='text-white grid grid-cols-6 border-b border-[#222B44] w-full py-[23px]  hover:bg-[#222B44] cursor-pointer transition-all'
									onClick={() => handleClick(user.id)}
								>
									<th>{user.email}</th>
									<th>{user.name}</th>
									<th>{user.role}</th>
									<th>{user.subscription.plan.type}</th>
									<th>{user.subscription.tokens}</th>
									<th className='flex gap-1 items-center justify-center'>
										{
											<BorderColorIcon
												sx={[
													{
														fill: '#1C64F2',
														transition: 'opacity .3s ease',
													},
													{
														'&:hover': {
															opacity: 0.5,
														},
													},
												]}
												onClick={e => thisWasNotInTheTestTask(e)}
											/>
										}
										{
											<DeleteIcon
												sx={[
													{
														fill: '#1C64F2',
														transition: 'opacity .3s ease',
													},
													{
														'&:hover': {
															opacity: 0.5,
														},
													},
												]}
												onClick={e => thisWasNotInTheTestTask(e)}
											/>
										}
									</th>
								</tr>
							))}
			</tbody>
		</table>
	)
}

export default Table
