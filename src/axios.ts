import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://test.gefara.xyz/api/v1',
})

export default instance
