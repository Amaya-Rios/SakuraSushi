<template>
    <Navbar />
    <div class="menu-container">
        <div class="productos">
            <div class="productos-grid">
                
                <div class="card" v-for="producto in productos" :key="producto.id">
                <img :src="producto.Imagen" :alt="producto.Nombre" />
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
            <h2>Orden mesa:{{ mesaSeleccionada }}</h2>
            <div v-if="carrito.length > 0" v-for="item in carrito">
                <h4>{{ item.Nombre }}</h4>
                <p>CAntidad: {{ item.cantidad }}</p>
                <p>Subtotal: ${{ item.Precio }}</p>
                <button class="btn-eliminar" @click="eliminarDelCarrito(item.id)">Eliminar</button>
                <hr>
            </div>
            <p v-if="carrito.length === 0">Sin platillos agregados</p>
            <button class="btn-enviar" v-if="carrito.length > 0" @click="enviarPedido">Enviar pedido</button>
         </aside>
    </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import Navbar from '../components/Navbar.vue'
import '../assets/css/Menu.css'
import { listarPlatillos } from '@/controllers/PlatilloController.js'
import { useRoute } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/config/firebase.js'
const route = useRoute()
const mesaSeleccionada = ref(route.query.mesa)
const productos = ref([])

async function cargarPlatillos() {
    try{
        productos.value = await listarPlatillos()
    }
    catch(error){
        console.error('Error al cargar platllos:', error)
    }
}

/*//prueba para ver funcionalidad
import SushiSalmon from '../assets/image/SushiSalmon.jpg'
import SushiAtun from '../assets/image/SushiAtun.jpg'
import SushiAguacate from '../assets/image/SushiAguacate.jpg'
const productos = ref([
    { id: 1, Nombre: 'Sushi de Salmón', Relleno: 'queso crema y pepino', Cubierto: 'salmón fresco', Precio: 80, imagen: SushiSalmon },
    { id: 2, Nombre: 'Sushi de Atún', Relleno: 'queso crema y pepino', Cubierto: 'atún fresco', Precio: 80, imagen: SushiAtun },
    { id: 3, Nombre: 'Sushi de Aguacate', Relleno: 'queso crema y pepino', Cubierto: 'aguacate', Precio: 80, imagen: SushiAguacate },
])*/

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

const eliminarDelCarrito = (id) => {
    carrito.value = carrito.value.filter(item => item.id !==id)
}
const total = computed (() => {
    return carrito.value.reduce((suma, item) => suma + (item.Precio * item.cantidad), 0)
})

const enviarPedido = async () =>{
    try{
        await addDoc(collection(db, "pedidos"),{
            mesa: mesaSeleccionada.value,
            productos: carrito.value,
            total: total.value,
            estado: 'Pendiente',
            fecha: new Date()
        })

        carrito.value = []
        alert ("Pedido enviado a cocina")
    }catch (error){
        console.error(error)
    }
           
}

onMounted(() => {
    cargarPlatillos()
})


</script>

