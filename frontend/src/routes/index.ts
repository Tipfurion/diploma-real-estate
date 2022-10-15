import * as VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

const Home = { template: '<div>Home</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: HelloWorld },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

export default router
