<template>
    <Navbar/>
    <br>
    <div class="mesas-container">
      <div class="mesas-grid">
        <div v-for="mesa in mesas" :key="mesa.id" class="mesa-card" @click="seleccionarMesa(mesa)">
          <h2>Mesa {{ mesa.numero }}</h2>
          <p>Estado: {{ mesa.estado }}</p>
        </div>
      </div>
    </div>
</template>
<script setup>
  import '../assets/css/menu.css'
  import Navbar from '../components/Navbar.vue'
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const mesas = ref ([
    { id: 1, numero: 1, estado: 'Disponible'},
    { id: 2, numero: 2, estado: 'Disponible'},
    { id: 3, numero: 3, estado: 'Disponible'},
    { id: 4, numero: 4, estado: 'Disponible'},
    { id: 5, numero: 5, estado: 'Disponible'},
    { id: 6, numero: 6, estado: 'Disponible'},
  ])

  function seleccionarMesa(mesa){
    router.push({
      name: 'menu',
      query:{ mesa:mesa.numero}
    })
  }

</script>

