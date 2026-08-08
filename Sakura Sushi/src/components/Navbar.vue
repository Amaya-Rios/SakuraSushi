<template>
    <nav class= "navbar">
        <div class="logo">
            <img src="https://res.cloudinary.com/dqhohmknq/image/upload/v1786161957/logo_mdcl4k.png" alt="Logo Sakura Sushi" />
        </div>

        <h1 class="titulo-navbar">{{ tituloPagina }}</h1>

        <ul class="navegacion">
            <template v-if="usuario?.Rol === 'Mesero'">
                <li><router-link to="/Mesero">Mesas</router-link></li>
                <li><router-link to="/Menu">Menú</router-link></li>
            </template>
            <li><i class="fa-solid fa-right-from-bracket logout-icon" @click="logout" title="Cerrar sesión"></i></li>
        </ul>
    </nav>
</template>
<script setup>
import '../assets/css/Navbar.css'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const usuario = ref(JSON.parse(localStorage.getItem('usuario')))
const tituloPagina = computed (() => {
    switch(route.name){
        case 'admin': return 'Panel de Administración'
        case 'mesero': return 'Órdenes'
        case 'menu': return 'Menú'
        case 'cocina': return 'Cocina'
        default: return 'Sakura Sushi'
    }
})

function logout(){
    localStorage.removeItem('usuario')
    router.push('/')
}
</script>
