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
        <div v-if="mensaje" class="success-message">{{ mensaje }}</div>

        <button type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '../assets/css/Login.css'
import {validarCorreo, validarPassword, autenticarUsuario} from '../controllers/AuthController.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const correo = ref('')
const password = ref('')
const error = ref('')
const mensaje = ref('')

const login = async() => {
  error.value = ''
  const resultado=await autenticarUsuario(correo.value, password.value)

  if (!resultado.success) {
    error.value = resultado.message
    mensaje.value = ''
    return
  }
  error.value = ''
  mensaje.value = 'Usuario autenticado correctamente'

  localStorage.setItem('usuario', JSON.stringify(resultado.usuario))
  console.log('Usuario autenticado:', resultado.usuario.Rol)

  switch (resultado.usuario.Rol) {
    case 'Cocina':
      router.push('/Cocina')
      break
    case 'Mesero':
      router.push('/Mesero')
      break
    case 'Administrador':
      router.push('/Admin')
      break
    default:
      error.value = 'Rol de usuario desconocido'
  }
}

/*prueba de conección firebase
import {obtenerUsuarios} from '../controllers/AuthController.js'
obtenerUsuarios();*/
</script>

