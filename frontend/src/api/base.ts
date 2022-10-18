import axios from 'axios'
import config from '@/config'
export const http = axios.create({
    baseURL: config.backendUrl,
    timeout: 10 * 1000,
    validateStatus: (status) => true,
})
