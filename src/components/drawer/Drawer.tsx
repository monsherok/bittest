import CloseIcon from '@mui/icons-material/Close'
import { Skeleton, SwipeableDrawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { toggleDrawer } from '../../store/slices/ui.slice'
import Chart from '../chart/Chart'
import Transactions from '../transactions/Transactions'

function Drawer() {
	const dispatch = useDispatch()

	const { drawerOpen } = useSelector((state: RootState) => state.ui)
	const { status, transactions } = useSelector(
		(state: RootState) => state.transactions
	)

	const { users } = useSelector((state: RootState) => state.users)

	const currentUser = transactions[0]
		? users.find(user => user.id === transactions[0].user_id)
		: null

	return (
		<SwipeableDrawer
			anchor={'right'}
			open={drawerOpen}
			onClose={() => dispatch(toggleDrawer(false))}
			onOpen={() => dispatch(toggleDrawer(true))}
			sx={[
				{
					'.css-1160xiw-MuiPaper-root-MuiDrawer-paper': {
						width: '490px',
						backgroundColor: '#121825',
						color: 'white',
						overflowX: 'hidden',
						padding: '20px',
						display: 'grid',
						paddingRight: '40px',
					},
				},
			]}
		>
			<div className='flex items-center justify-between mb-5'>
				<span>
					{status === 'loading' ? (
						<Skeleton
							variant='text'
							animation='wave'
							sx={{ fontSize: '1rem', width: '160px' }}
						/>
					) : (
						currentUser?.email
					)}
				</span>
				<CloseIcon
					onClick={() => dispatch(toggleDrawer(false))}
					className='cursor-pointer'
					sx={[
						{
							transition: 'opacity .3s ease',
						},
						{
							'&:hover': {
								opacity: 0.5,
							},
						},
					]}
				/>
			</div>
			<Chart />
			<Transactions />
		</SwipeableDrawer>
	)
}

export default Drawer
