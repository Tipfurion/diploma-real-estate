import * as VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import { useAuthStore } from '../stores/authStore'
const CreatePost = () => import('@/views/CreatePost.vue')
const Post = () => import('@/views/Post.vue')
const Home = { template: '<div>Home</div>' }

const routes = [
    { path: '/', component: Home, authRequired: false },
    { path: '/post/:postId', component: Post, authRequired: false },
    { path: '/create-post', component: CreatePost, authRequired: true },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const protectedPaths = routes.filter((el) => el.authRequired).map((el) => el.path)
router.beforeEach((to, from, next) => {
    return next()
    const authStore = useAuthStore()
    if (protectedPaths.includes(to.path) && !authStore.logged) next('/')
    else next()
})
export default router
