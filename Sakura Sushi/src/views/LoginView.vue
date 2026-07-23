<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Sakura Sushi</h1>
      <h2>Iniciar Sesión</h2>

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
        <a href="NewUserView.vue">Nuevo empleado?</a>

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '../assets/css/login.css'
const correo = ref('')
const password = ref('')

const login = () => {
  console.log(correo.value)
  console.log(password.value)

  // Conectar con firebase para autenticación
}
</script>

