import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null }),
    getters: {
        logged: (state) => Boolean(state.user),
    },
    actions: {
        increment() {},
    },
})
