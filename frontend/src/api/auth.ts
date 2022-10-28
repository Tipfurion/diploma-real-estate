import { http } from './base'
interface registerParams {
    phone: string
    password: string
    repeatedPassword: string
}
interface loginParams {
    phone: string
    password: string
}
export const register = async (params: registerParams): Promise<{ data: any; error: any }> => {
    const res = await http.post('/auth/register', { ...params })
    return res.data
}
export const login = async (params: loginParams): Promise<{ data: any; error: any }> => {
    const res = await http.post('/auth/login', { ...params })
    return res.data
}
export const me = async (token: string): Promise<{ data: any; error: any }> => {
    const res = await http.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
    return res.data
}
