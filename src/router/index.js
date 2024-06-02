import { createRouter, createWebHistory } from 'vue-router'
import List from '../components/clients/AppList.vue'
import Register from '../components/clients/AppRegister.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: List
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
