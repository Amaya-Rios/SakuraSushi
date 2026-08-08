<template>
    <nav class= "navbar">
        <div class="logo">
            <img src="../assets/image/logo.png" alt="Logo Sakura Sushi" />
        </div>
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
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const usuario = ref(JSON.parse(localStorage.getItem('usuario')))

function logout(){
    localStorage.removeItem('usuario')
    router.push('/')
}
</script>
