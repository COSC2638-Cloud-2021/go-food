import axios from 'axios'

const isLocal = false
const url = isLocal ? 'http://localhost:8080' : 'http://54.255.243.115:8080'

const api = axios.create({
    withCredentials: true,
    baseURL: url,
})

export default api