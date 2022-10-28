import { defineStore } from 'pinia'
import api from '../api'
export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null, loading: false }),
    getters: {
        logged: (state) => Boolean(state.user),
    },
    actions: {
        async loadUser(token: string) {
            this.loading = true
            const { data, error } = await api.me(token)
            this.user = data

            localStorage.setItem('token', token)
            localStorage.setItem('tokenExpires', String(data.exp * 1000))

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
    },
})
