<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Sakura Sushi</h1>
      <h2>Inicio de Sesión</h2>

      <form @submit.prevent="login">
        <input
          v-model="correo"
          type="email"
          placeholder="Correo"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
        

        />
        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '../assets/css/Login.css'
import {validarCorreo, validarPassword, autenticarUsuario} from '../controllers/AuthController.js'
const correo = ref('')
const password = ref('')
const error = ref('')

const login = async() => {
  error.value = ''
  const resultado=await autenticarUsuario(correo.value, password.value)
  if (!resultado.exito) {
    error.value = resultado.message
    return
  }
  console.log('Usuario autenticado:', resultado.usuario)
}

//prueba de conección firebase
import {obtenerUsuarios} from '../controllers/AuthController.js'
obtenerUsuarios();
</script>

