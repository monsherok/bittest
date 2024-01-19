import { ThemeProvider, createTheme } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<ThemeProvider theme={createTheme({})}>
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>
)
