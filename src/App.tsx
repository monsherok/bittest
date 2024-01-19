import { Container, Grid } from '@mui/material'
import Board from './components/board/Board'
import Drawer from './components/drawer/Drawer'
import Header from './components/header/Header'

const App = () => {
	return (
		<Container maxWidth='xl'>
			<Grid
				container
				direction='column'
				justifyContent='flex-start'
				alignItems='stretch'
				gap={4.25}
				marginTop={3}
			>
				<Header />
				<Board />
			</Grid>
			<Drawer />
		</Container>
	)
}

export default App
