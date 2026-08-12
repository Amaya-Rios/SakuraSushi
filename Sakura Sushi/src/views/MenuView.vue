<template>
    <Navbar />
    <div class="menu-container">
        <div class="productos">
            <div class="productos-grid">
                
                <div class="card" v-for="producto in productos" :key="producto.id">
                <img :src="producto.Imagen" :alt="producto.Nombre" />
                <div class="contenido-card">
                    <h2>{{ producto.Nombre }}</h2>
                    <p><strong>Por dentro:</strong> {{ producto.Relleno }}</p>
                    <p><strong>Por fuera:</strong> {{ producto.Cubierto }}</p>
                    <p class="precio">${{ producto.Precio}}</p> 
                </div>
                <button @click="agregarAlPedido(producto)">Agregar al pedido</button>
                </div>
            </div> 
        </div>
        <!-- Orden de platillos -->
         <aside class="pedido">
            <h2>Orden mesa {{ mesaSeleccionada }}</h2>
            <div v-if="Pedido.length > 0" v-for="item in Pedido">
                
                <div class="cantidad-control">
                    <span>{{ item.Nombre }}</span>
                    <button class="btn-cantidad" @click="disminuirCantidad(item.id)">-</button>
                    <span class="cantidad">{{ item.Cantidad }}</span>
                    <button class="btn-cantidad" @click="aumentarCantidad(item.id)">+</button>
                    <button class="btn-eliminar" @click="eliminarDelPedido(item.id)">Eliminar</button>

                </div>
                <hr>
            </div>
            <p v-if="Pedido.length === 0">Sin platillos agregados</p>
            <hr>
            <h3>Total: ${{ total }}</h3>
            <button class="btn-enviar" v-if="Pedido.length > 0" @click="enviarPedido">Enviar pedido</button>
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
import { serverTimestamp } from 'firebase/firestore'

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

const Pedido = ref([])

const agregarAlPedido = (producto) => {
    const existente = Pedido.value.find(
        item => item.id === producto.id
    )
    if (existente){
        existente.Cantidad++
    }
    else{
        Pedido.value.push({...producto, Cantidad: 1})
    }
}

const aumentarCantidad = (id) => {
    const item = Pedido.value.find(
        producto => producto.id === id
    )
    if (item){
        item.Cantidad++
    }
}

const disminuirCantidad = (id) => {
    const item = Pedido.value.find(
        producto => producto.id === id
    )
    if (item){
        if (item.Cantidad > 1){
            item.Cantidad--
        }
        else{
            eliminarDelPedido(id)
        }
    }
}

const eliminarDelPedido = (id) => {
    Pedido.value = Pedido.value.filter(item => item.id !==id)
}
const total = computed (() => {
    return Pedido.value.reduce((suma, item) => suma + (item.Precio * item.Cantidad), 0)
})

const enviarPedido = async () =>{
    try{
        await addDoc(collection(db, "Pedidos"),{
            Mesa: mesaSeleccionada.value,
            Platillos: Pedido.value,
            Total: total.value,
            Estado: 'Pendiente',
            Fecha: serverTimestamp()
        })
        Pedido.value = []
        alert ("Pedido enviado a cocina")
    }catch (error){
        console.error(error)
    }
           
}

onMounted(() => {
    cargarPlatillos()
})


</script>

