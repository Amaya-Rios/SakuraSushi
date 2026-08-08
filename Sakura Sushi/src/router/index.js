import {createRouter, createWebHistory} from 'vue-router'
import { auth } from '../config/firebase.js'
import LoginView from '../views/LoginView.vue'
import MenuView from '../views/MenuView.vue'
import AdminView from '../views/AdminView.vue'
import MeseroView from '../views/MeseroView.vue'
import CocinaView from '../views/CocinaView.vue'

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/Admin',
        name: 'admin',
        component: AdminView,
        meta: { 
            requiresAuth: true,
            rol: 'Administrador'
        } 
    },
    {
        path: '/Mesero',
        name: 'mesero',
        component: MeseroView,
        meta: { 
            requiresAuth: true,
            rol: 'Mesero'
        } 
    },
    {
        path: '/Menu',
        name: 'menu',
        component: MenuView,
        meta: { 
            requiresAuth: true,
            rol: 'Mesero'
        } 
    },
    {
        path: '/Cocina',
        name: 'cocina',
        component: CocinaView,
        meta: { 
            requiresAuth: true,
            rol: 'Cocina'
        } 
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (to.path === '/') {
        return true
    }
    if (!usuario) { //si no hay usuario ni autenticación
        return '/'
    }
    if (to.meta.rol){
        if (usuario.Rol !== to.meta.rol) { //si el rol del usuario no coincide con el rol requerido
        switch (usuario.Rol) {
            case 'Administrador':
                return '/Admin'
            case 'Mesero':
                return '/Mesero'
            case 'Cocina':
                return '/Cocina'
            default:
                return '/'
        }
    }

    }
    return true
})

export default router
