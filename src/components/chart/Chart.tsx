import { Box, Skeleton } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

function Chart() {
	const { status, transactions } = useSelector(
		(state: RootState) => state.transactions
	)

	const pData = transactions
		.slice(0, 10)
		.map(transaction => transaction.amount)
		.reverse()
	const xLabels = transactions
		.slice(0, 10)
		.map(transaction => Date.parse(transaction.created_at))
		.reverse()

	return (
		<Box width={430} height={351}>
			<h3 className='text-xl font-semibold'>Использование токенов</h3>
			{status === 'loading' ? (
				<Skeleton
					variant='rectangular'
					animation='wave'
					width={430}
					height={351}
				/>
			) : (
				<LineChart
					xAxis={[{ scaleType: 'time', data: xLabels }]}
					series={[{ data: pData }]}
					width={430}
					height={351}
					sx={[
						{
							'.MuiChartsAxis-tickLabel': {
								fill: 'white',
							},
						},
					]}
				/>
			)}
		</Box>
	)
}

export default Chart
