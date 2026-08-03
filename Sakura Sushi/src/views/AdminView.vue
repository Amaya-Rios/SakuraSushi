<template>
    <div class="admin-container"> 
        <h1>Panel de Administración</h1>
        <div class="container">
            <div class="card">
                <h1>Administración de usuarios</h1>
                <button class="btn-agregar" @click="mostrarFormulario = true">Agregar usuario</button>
                <br><br>
                <div class="table-container">
                    <div v-if="usuarios.length === 0">No hay usuarios registrados.</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="usuario in usuarios" :key="usuario.id">
                                <td>{{ usuario.Nombre }}</td>
                                <td>{{ usuario.Apellido }}</td>
                                <td>{{ usuario.Correo }}</td>
                                <td>{{ usuario.Rol }}</td>
                                <td><button @click="eliminar(usuario.id)">Eliminar</button> <button @click="modificar(usuario)">Editar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

//para mostrar formulario de registro de usuario
        <div v-if="mostrarFormulario" class="modal">
            <div class="modal-content">
                <h2>Agregar Usuario</h2>
                <form @submit.prevent="guardarUsuario">
                    <input
                        v-model="nuevoNombre"
                        type="text"
                        placeholder="Nombre de nuevo usuario"
                        required
                    />
                    <input
                        v-model="nuevoApellido"
                        type="text"
                        placeholder="Apellido del nuevo usuario"
                        required
                    />
                    <input
                        v-model="nuevoCorreo"
                        type="email"
                        placeholder="Correo"
                        required
                        />
                    <input
                        v-model="nuevoPassword"
                        type="password"
                        placeholder="Contraseña"
                        required
                    />
                    <select v-model="nuevoRol" required placeholder="Rol de usuario">
                        <option value="" disabled>Selecciona un rol</option>
                        <option value="Cocina">Cocina</option>
                        <option value="Mesero">Mesero</option>
                    </select>
                    <button type="submit">Crear Usuario</button>
                    <button type="button" @click="mostrarFormulario = false">Cancelar</button>
                </form>
                <div v-if="mensaje" class="success-message">{{ mensaje }}</div>
                <hr>

            </div>
        </div>

//para mostrar formulario de edicion de usuario
        <div v-if="mostrarEditar" class="modal">
            <div class="modal-content">
                <h2>Editar Usuario</h2>
                <form @submit.prevent="guardarCambios">
                    <input
                        v-model="editNombre"
                        type="text"
                        placeholder="Nombre de usuario"
                        required
                    />
                    <input
                        v-model="editApellido"
                        type="text"
                        placeholder="Apellido de usuario"
                        required
                    />
                    <input
                        v-model="editCorreo"
                        type="email"
                        placeholder="Correo"
                        required
                        />
                    <input
                        v-model="editPassword"
                        type="password"
                        placeholder="Contraseña"
                        required
                    />
                    <select v-model="editRol" required placeholder="Rol de usuario">
                        <option value="" disabled>Selecciona un rol</option>
                        <option value="Cocina">Cocina</option>
                        <option value="Mesero">Mesero</option>
                    </select>
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" @click="mostrarEditar = false">Cancelar</button>
                </form>
                <div v-if="mensaje" class="success-message">{{ mensaje }}</div>
                <hr>

            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import '../assets/css/Admin.css'
import { registrarUsuario, listarUsuarios, borrarUsuario, modificarUsuario } from '@/controllers/UserController';

const mostrarFormulario = ref(false)

const mostrarEditar = ref(false)
const usuarioEditar = ref(null)
const usuarios = ref([])

//para formulario de registro de usuario
const nuevoNombre = ref('')
const nuevoApellido = ref('')
const nuevoCorreo = ref('')
const nuevoPassword = ref('')
const nuevoRol = ref('')

//para formulario de edicion de usuario
const editNombre = ref('')
const editApellido = ref('')
const editCorreo = ref('')
const editPassword = ref('')
const editRol = ref('')

const mensaje = ref('')

async function cargarUsuarios() {
    usuarios.value = await listarUsuarios()

}

async function guardarUsuario(){
    try{
        await registrarUsuario({
            Nombre:nuevoNombre.value,
            Apellido:nuevoApellido.value,
            Correo:nuevoCorreo.value,
            Contraseña:nuevoPassword.value,
            Rol: nuevoRol.value
        })
        mensaje.value= 'usuario creado correctamente'
        nuevoNombre.value =''
        nuevoApellido.value =''
        nuevoCorreo.value =''
        nuevoPassword.value =''
        nuevoRol.value =''

        await cargarUsuarios()

    }
    catch (error){
        mensaje.value = error.message
    }
}

async function guardarCambios(){
    try{
        await modificarUsuario(
            usuarioEditar.value.id,
            {
                Nombre:editNombre.value,
                Apellido:editApellido.value,
                Correo:editCorreo.value,
                Contraseña:editPassword.value,
                Rol: editRol.value
            }
        )
        await cargarUsuarios()
        mostrarEditar.value = false
        mensaje.value = 'usuario modificado correctamente'
    }
    catch (error){
        mensaje.value = error.message
    }
}

async function modificar(usuario) {
    usuarioEditar.value = usuario

    editNombre.value = usuario.Nombre
    editApellido.value = usuario.Apellido
    editCorreo.value = usuario.Correo
    editPassword.value = usuario.Contraseña
    editRol.value = usuario.Rol
    mostrarEditar.value = true
}

async function eliminar(id) {
    await borrarUsuario(id)
    await cargarUsuarios() 
}


onMounted(() =>{
    cargarUsuarios()
})
</script>