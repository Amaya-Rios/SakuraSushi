import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MenuView from '../views/MenuView.vue'
const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/Menu',
        name: 'menu',
        component: MenuView
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
