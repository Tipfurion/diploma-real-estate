import { defineStore } from 'pinia'
import api from '../api'
import router from '@/routes/index'
export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null as any, loading: false }),
    getters: {
        logged: (state) => Boolean(state.user),
    },
    actions: {
        async loadUser(token: string) {
            this.loading = true
            localStorage.setItem('token', token)
            const { data, error } = await api.me()
            localStorage.setItem('tokenExpires', String(data.exp * 1000))
            this.user = data

            this.loading = false
        },
        async checkAndLoadUser() {
            const expiresAtStr = localStorage.getItem('tokenExpires')
            if (!expiresAtStr) {
                return
            }
            const expiresAt = Number(expiresAtStr)
            if (Date.now() > expiresAt) {
                return
            }
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }

            this.loadUser(token)
        },
        async logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpires')
            this.user = null
            router.push('/')
        },
    },
})
