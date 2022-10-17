import { createApp } from 'vue'
import './style.css'
import router from '@/routes/index'
import App from './App.vue'
import { createPinia } from 'pinia'
import Maska from 'maska'
const pinia = createPinia()
createApp(App).use(router).use(pinia).use(Maska).mount('#app')
