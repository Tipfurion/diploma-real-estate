import { defineStore } from 'pinia'
import api from '../api'
import router from '@/routes/index'
export const useCreatePostStore = defineStore('createPost', {
    state: () => ({
        post: {
            type: 'rent',
            address: 'г Москва, ул Тверская, д 11',
            country: 'Россия',
            city: 'Москва',
            house: '11',
            geoLat: '55.76056',
            geoLon: '37.609811',
        } as Object,
        initSteps: [
            { id: 1, title: 'Тип обьявления', disabled: false },
            { id: 2, title: 'Адрес', disabled: false },
            { id: 3, title: 'Об объекте', disabled: false },
            { id: 4, title: 'Цена', disabled: false },
        ],
        currentStepId: 3,
        currentStepStatus: 'process' as 'error' | 'wait' | 'finish' | 'process' | undefined,
    }),
    getters: {
        steps: (state) =>
            state.initSteps.map((step) => (step.id <= state.currentStepId ? step : { ...step, disabled: true })),
    },
    actions: {
        setPostProps(fields: Object) {
            this.post = { ...this.post, ...fields }
        },
        nextStep() {
            this.currentStepId++
        },
    },
})
