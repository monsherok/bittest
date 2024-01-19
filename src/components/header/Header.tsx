import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import PersonIcon from '@mui/icons-material/Person'
import { Grid } from '@mui/material'
function Header() {
	return (
		<Grid
			item
			bgcolor={'#121825'}
			style={{
				padding: '24px 26.4px',
				borderRadius: '17px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: '50px',
			}}
		>
			<span className='text-[22px] font-semibold'>BitTest</span>
			<div className='flex gap-[10px]'>
				<span className='flex items-center justify-center rounded-[4px] bg-[#222B44] w-[24px] h-[24px] '>
					<BusinessCenterIcon
						sx={[
							{
								width: '15px',
							},
						]}
					/>
				</span>
				<span className='font-medium text-[16]'>Моя организация</span>
			</div>

			<div className='border-[#222B44] border rounded-md flex py-2 px-[14px] gap-3 items-center ml-auto'>
				<div className='bg-[#313E62] rounded-full p-1'>
					<PersonIcon />
				</div>
				<div className='flex flex-col'>
					<span className='text-[#616D8D] text-xs'>Вы авторизованы</span>
					<span className='text-sm font-medium'>Администратор</span>
				</div>
			</div>
		</Grid>
	)
}

export default Header
