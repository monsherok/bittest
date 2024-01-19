import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../store/slices/users.slice'

function Search() {
	const [showClearIcon, setShowClearIcon] = useState('none')
	const [inputValue, setInputValue] = useState('')
	const dispatch = useDispatch()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setShowClearIcon(event.target.value === '' ? 'none' : 'flex')
		const value = event.target.value
		dispatch(setFilter(value))
		setInputValue(value)
	}

	const handleClick = (): void => {
		setShowClearIcon('none')
		setInputValue('')
		dispatch(setFilter(''))
	}

	return (
		<div className='py-6 px-[34px]'>
			<h2>Пользователи</h2>
			<div className='relative py-[24px]'>
				<SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4 bg-[#616D8D] rounded-[100%] p-[2px] max-w-4 max-h-4' />
				<input
					className='px-[42px] py-[14px] bg-transparent border border-[#313E62] rounded-lg relative w-full text-sm leading-[18px]'
					type='text'
					value={inputValue}
					placeholder='Поиск'
					onChange={handleChange}
				/>
				<ClearIcon
					className='absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'
					style={{ display: showClearIcon }}
					onClick={handleClick}
				/>
			</div>
		</div>
	)
}

export default Search
