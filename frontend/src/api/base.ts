import axios from 'axios'
import config from '@/config'
export const http = axios.create({
    baseURL: config.backendUrl,
    timeout: 10 * 1000,
    validateStatus: (status) => true,
})

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers!.Authorization = `Bearer ${token}`
    config.headers!.Accept = 'application/json'
    return config
})
