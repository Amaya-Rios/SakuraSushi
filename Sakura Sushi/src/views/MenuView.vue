<template>
    <Navbar />
    <div class="menu-container">
        
        <div class="productos">
            <h1>Menu</h1>
            <div class="productos-grid">
                
                <div class="card" v-for="producto in productos" :key="producto.id">
                <img :src="producto.imagen" :alt="producto.Nombre" />
                <h2>{{ producto.Nombre }}</h2>
                <p>Por dentro: {{ producto.Relleno }}</p>
                <p>Por fuera: {{ producto.Cubierto }}</p>
                <p>${{ producto.Precio}}</p>  
                <button @click="agregarAlCarrito(producto)">Agregar al Carrito</button>
                </div>
            </div> 
        </div>
        <!-- Orden de platillos -->
         <aside class="carrito">
            <h2>Orden actual</h2>
            
         </aside>
    </div>
</template>

<script setup>
<<<<<<< Updated upstream
import {ref} from 'vue'
=======
import {ref, onMounted, computed} from 'vue'
>>>>>>> Stashed changes
import Navbar from '../components/Navbar.vue'
import '../assets/css/Menu.css'
import SushiSalmon from '../assets/image/SushiSalmon.jpg'
import SushiAtun from '../assets/image/SushiAtun.jpg'
import SushiAguacate from '../assets/image/SushiAguacate.jpg'
//prueba para ver funcionalidad
const productos = ref([
    { id: 1, Nombre: 'Sushi de Salmón', Relleno: 'queso crema y pepino', Cubierto: 'salmón fresco', Precio: 80, imagen: SushiSalmon },
    { id: 2, Nombre: 'Sushi de Atún', Relleno: 'queso crema y pepino', Cubierto: 'atún fresco', Precio: 80, imagen: SushiAtun },
    { id: 3, Nombre: 'Sushi de Aguacate', Relleno: 'queso crema y pepino', Cubierto: 'aguacate', Precio: 80, imagen: SushiAguacate },
])

const carrito = ref([])

const agregarAlCarrito = (producto) => {
    const existente = carrito.value.find(
        item => item.id === producto.id
    )
    if (existente){
        existente.cantidad++
    }
    else{
        carrito.value.push({...producto, cantidad: 1})
    }
}
const total = computed (() => {
    return carrito.value.reduce((suma, item) => suma + (item.Precio * item.cantidad), 0)
})

</script>

