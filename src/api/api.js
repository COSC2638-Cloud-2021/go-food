import axios from 'axios'

const isLocal = false
const url = isLocal ? 'http://localhost:8080' : 'http://go-food-43866485.ap-southeast-1.elb.amazonaws.com/'

const api = axios.create({
    withCredentials: true,
    baseURL: url,
})

export default api