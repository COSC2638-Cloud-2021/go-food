import axios from 'axios'

const isLocal = false
const url = isLocal ? 'http://localhost:8080' : 'https://go-food-2021.herokuapp.com/'

const api = axios.create({
    withCredentials: true,
    baseURL: url,
})

export default api