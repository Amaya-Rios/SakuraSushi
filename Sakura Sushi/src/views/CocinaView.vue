<template>
  <Navbar />
  <div class="cocina-container">
    <div class="pedidos">
      <h1>Órdenes pendientes</h1>
      <div class="pedidos-grid">
        <div v-for="pedido in pedidosPendientes" :key="pedido.id" class="pedido-card" :class="pedido.Estado?.toLowerCase()" @click="seleccionarPedido(pedido)">
          <h3>Mesa {{ pedido.Mesa }}</h3>
          <p>Estado: {{ pedido.Estado }}</p>
          <p>Platillos: {{ pedido.Platillos?.length || 0 }}</p>
        </div>
      </div>
      <h1>Órdenes entregadas</h1>
      <div class="pedidos-grid">
        <div v-for="pedido in pedidosEntregados" :key="pedido.id" class="pedido-card entregado" @click="seleccionarPedido(pedido)">
          <h3>Mesa {{ pedido.Mesa }}</h3>
          <p>Estado: {{ pedido.Estado }}</p>
          <p>Platillos: {{ pedido.Platillos?.length || 0 }}</p>
        </div>
      </div>
    </div>

    <!-- Para panel de detalles de orden -->
    <aside class="detalle-pedido" v-if="pedidoSeleccionado">
      <h2>Mesa {{ pedidoSeleccionado.Mesa }}</h2>
      <hr>
      <div v-for="producto in pedidoSeleccionado.Platillos" :key="producto.id" class="produccto-detalle">
        <h4>{{ producto.Nombre }}</h4>
        <p>Cantidad: {{ producto.Cantidad }}</p>
        <label>Estado:</label>
        <select v-model="producto.Estado">
          <option value="Preparando">Preparando</option>
          <option value="Listo">Listo</option>
        </select>
      </div>
      <br>
      <hr>
      <h3>Estado de orden</h3>
      <select v-model="pedidoSeleccionado.Estado">
        <option value="Pendiente">Pendiente</option>
        <option value="Preparando">Preparando</option>
        <option value="Listo">Listo para recoger</option>
        <option value="Entregado">Entregado</option>
      </select>
      <button class="btn-guardar" @click="guardarCambios">Guardar cambios</button>
    </aside> 
  </div>
</template>

<script setup>

import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { ref,onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import "../assets/css/Cocina.css"
import { computed } from 'vue';

const pedidos = ref([])
const pedidoSeleccionado = ref(null)
const pedidosPendientes = computed(() => pedidos.value.filter(pedido => pedido.Estado!== "Entregado"))
const pedidosEntregados = computed(() => pedidos.value.filter(pedido => pedido.Estado === "Entregado"))

async function cargarPedidos() {
  const snapshot = await getDocs (collection(db, "Pedidos"))
  pedidos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
  
}

function seleccionarPedido(pedido){
  pedidoSeleccionado.value = JSON.parse(JSON.stringify(pedido))
}

async function guardarCambios() {
  try{
    await updateDoc(doc(db, "Pedidos", pedidoSeleccionado.value.id),{
      Estado: pedidoSeleccionado.value.Estado,
      Platillos: pedidoSeleccionado.value.Platillos
    })
    await cargarPedidos()
    alert("Pedido actualizado correctamente")
  }
  catch(error){
    alert("Error al actualizar pedido")
  }
  
}

onMounted(() => { cargarPedidos()})


</script>