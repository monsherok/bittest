import { Skeleton } from '@mui/material'
import { useSelector } from 'react-redux'
import { ITransaction } from '../../interfaces/transactions.interface'
import { RootState } from '../../store'

interface TableHead {
	name: string
}

const tableHeads: readonly TableHead[] = [
	{ name: 'Тип' },
	{ name: 'Сумма' },
	{ name: 'Дата' },
]

function formatDate(date: string) {
	const dateObject = new Date(date)

	const day = dateObject.getDate()
	const month = dateObject.getMonth() + 1
	const year = dateObject.getFullYear() % 100

	const hours = dateObject.getHours()
	const minutes = dateObject.getMinutes()
	const seconds = dateObject.getSeconds()

	const formatNumber = (number: number) => (number < 10 ? `0${number}` : number)

	const formattedDate = `${formatNumber(day)}.${formatNumber(
		month
	)}.${formatNumber(year)}, ${formatNumber(hours)}:${formatNumber(
		minutes
	)}:${formatNumber(seconds)}`

	return formattedDate
}

function Transactions() {
	const { status, transactions } = useSelector(
		(state: RootState) => state.transactions
	)

	return (
		<div className='border-t border-[#222B44] mt-5'>
			<h3 className='my-5 text-xl font-semibold'>История операций</h3>
			<table className='grid grid-flow-row text-sm'>
				<thead>
					<tr className='bg-[#0E0C15] grid grid-cols-3 rounded-lg'>
						{tableHeads.map(tableHead => (
							<th key={tableHead.name} className='py-[14px] text-[#9CA3AF]'>
								{tableHead.name}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{status === 'loading'
						? Array.from({ length: 10 }).map((item, index) => (
								<tr
									key={index}
									className='text-white grid grid-cols-3 border-b border-[#222B44] w-full py-[23px]  hover:bg-[#222B44] cursor-pointer transition-all'
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
						: transactions.map((transaction: ITransaction) => (
								<tr
									key={transaction.id}
									className='text-white grid grid-cols-3 border-b border-[#222B44] w-full py-[23px]  hover:bg-[#222B44] cursor-pointer transition-all'
								>
									<th className='flex justify-center items-center'>
										{transaction.type === 'REPLENISH'
											? 'Пополнение'
											: 'Списание'}
									</th>
									<th
										className={
											transaction.type === 'REPLENISH'
												? 'text-[#1ABB34]'
												: 'text-[#FE4242]'
										}
									>
										{transaction.amount} {transaction.currency}
									</th>
									<th className='flex justify-center items-center flex-col'>
										<p>{formatDate(transaction.created_at).split(',')[0]}</p>
										<p>{formatDate(transaction.created_at).split(',')[1]}</p>
									</th>
								</tr>
						  ))}
				</tbody>
			</table>
		</div>
	)
}

export default Transactions
