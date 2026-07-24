<template>
    
    <div class="menu-container">
        
        <div class="productos">
            <h1>Menu</h1>
            <div class="productos-grid">
                
                <div class="card" v-for="producto in productos" :key="producto.id">
                <img :src="producto.imagen" :alt="producto.nombre" />
                <h2>{{ producto.nombre }}</h2>
                <p>{{ producto.descripcion }}</p>
                <p>${{ producto.precio}}</p>  
                <button @click="agregarAlCarrito(producto)">Agregar al Carrito</button>
                </div>
            </div> 
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import '../assets/css/menu.css'
//prueba para ver funcionalidad
const productos = ref([
    { id: 1, nombre: 'Sushi de Salmón', descripcion: 'Sushi relleno de queso crema y pepino, salmón por fuera', precio: 80, imagen: 'https://example.com/sushi-salmon.jpg' },
    { id: 2, nombre: 'Sushi de Atún', descripcion: 'Sushi relleno de queso crema y pepino, salmón por fuera', precio: 80, imagen: 'https://example.com/sushi-atun.jpg' },
])

const carrito = ref([])

const agregarAlCarrito = (producto) => {
    carrito.value.push(producto)
    console.log('Producto agregado al carrito:', producto)
}

</script>

