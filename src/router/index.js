import { createRouter, createWebHistory } from 'vue-router'
import List from '../components/clients/AppList.vue'
import Register from '../components/clients/AppRegister.vue'
import Address from '../components/addresses/AppAddress.vue'

const routes = [
    {
        path: '/',
        name: 'ClientsList',
        component: List
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/edit/:id',
        name: 'EditClient',
        component: Register,
        props: true
    },
    {
        path: '/address',
        name: 'Address',
        component: Address
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
