<template>
    <nav class= "navbar">
        <div class="logo">
            <img src="../assets/image/logo.png" alt="Logo Sakura Sushi" />
        </div>
        <ul class="navegacion">
            <li><router-link to="/mesas">Mesas</router-link></li>
            <li><router-link to="/menu">Menú</router-link></li>
            <li><router-link to="/login">Iniciar Sesión</router-link></li>
        </ul>
    </nav>
</template>
<script setup>
import { ref } from 'vue'
import '../assets/css/Navbar.css'
</script>
