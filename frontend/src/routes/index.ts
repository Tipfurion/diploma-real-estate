import * as VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
const CreatePost = () => import('@/views/CreatePost.vue')
const Home = { template: '<div>Home</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/create-post', component: CreatePost },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

export default router
