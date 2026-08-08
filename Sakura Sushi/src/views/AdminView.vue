<template>
    <Navbar> <h1 class="titulo-navbar">Panel de administración</h1></Navbar>
    <div class="admin-container"> 
        <div class="container">
<!-----------Panel de usuarios------------------>
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
<!-----------Panel de platillos------------------>
            <div class="card">
                <h1>Administración de platillos</h1>
                <button class="btn-agregar" @click="mostrarFormularioPlatillo = true">Agregar platillo</button>
                <br><br>
                <div class="table-container">
                    <div v-if="platillos.length === 0">No hay platillos registrados.</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Relleno</th>
                                <th>Cubierto</th>
                                <th>Precio</th>
                                <th>Imagen</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="platillo in platillos" :key="platillo.id">
                                <td>{{ platillo.Nombre }}</td>
                                <td>{{ platillo.Relleno }}</td>
                                <td>{{ platillo.Cubierto }}</td>
                                <td>${{ platillo.Precio }}</td>
                                <td><img :src="platillo.Imagen" alt="Imagen del platillo" width="100"></td>
                                <td><button @click="eliminarPlatillo(platillo.id)">Eliminar</button> 
                                    <button @click="editarPlatillo(platillo)">Editar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

<!-- //------Formularios de usuarios ----------------- -->
<!-- //para mostrar formulario de registro de usuario -->
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

<!-- //para mostrar formulario de edicion de usuario -->
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

<!-- //------Formularios de platillos ----------------- -->
    <!-- //formulario para agregar platillo -->

        <div v-if="mostrarFormularioPlatillo" class="modal">
            <div class="modal-content">
                <h2>Agregar Platillo</h2>
                <form @submit.prevent="guardarPlatillo">
                    <input
                        v-model="nombrePlatillo"
                        type="text"
                        placeholder="Nombre del platillo"
                        required
                    />
                    <input
                        v-model="rellenoPlatillo"
                        type="text"
                        placeholder="Relleno del platillo"
                        required
                    />
                    <input
                        v-model="cubiertoPlatillo"
                        type="text"
                        placeholder="Cubierto del platillo"
                        required
                    />
                    <input
                        v-model="precioPlatillo"
                        type="number"
                        placeholder="Precio del platillo"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        @change="seleccionarImagen"
                        required
                    />
                    <button type="submit">Crear Platillo</button>
                    <button type="button" @click="mostrarFormularioPlatillo = false">Cancelar</button>
                </form>
                <div v-if="mensaje" class="success-message">{{ mensaje }}</div>
                <hr>

            </div>
        </div>

<!-- //formulario para editar platillo -->
        <div v-if="mostrarEditarPlatillo" class="modal">
            <div class="modal-content">
                <h2>Editar Platillo</h2>
                <form @submit.prevent="guardarCambiosPlatillo">
                    <input
                        v-model="editNombrePlatillo"
                        type="text"
                        placeholder="Nombre del platillo"
                        required
                    />
                    <input
                        v-model="editRellenoPlatillo"
                        type="text"
                        placeholder="Relleno del platillo"
                        required
                    />
                    <input
                        v-model="editCubiertoPlatillo"
                        type="text"
                        placeholder="Cubierto del platillo"
                        required
                    />
                    <input
                        v-model="editPrecioPlatillo"
                        type="number"
                        placeholder="Precio del platillo"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        @change="seleccionarImagenEditar"
                        required
                    />
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" @click="mostrarEditarPlatillo = false">Cancelar</button>
                </form>
                <div v-if="mensaje" class="success-message">{{ mensaje }}</div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../assets/css/Admin.css'
import Navbar from '../components/Navbar.vue'
// para crud de usuarios
import { registrarUsuario, listarUsuarios, borrarUsuario, modificarUsuario } from '@/controllers/UserController';
//para hasheo de contraseñas
import bcrypt from 'bcryptjs';
//para crud de platillos
import { registrarPlatillo, listarPlatillos, borrarPlatillo, modificarPlatillo as actualizarPlatillo } from '@/controllers/PlatilloController';

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

//para formulario de platillos
const platillos = ref([])
const nombrePlatillo = ref('')
const rellenoPlatillo = ref('')
const cubiertoPlatillo = ref('')
const precioPlatillo = ref('')
const imagenPlatillo = ref(null)
//para formulario de edicion de platillo
const platilloEditar = ref(null)
const editNombrePlatillo = ref('')
const editRellenoPlatillo = ref('')
const editCubiertoPlatillo = ref('')
const editPrecioPlatillo = ref('')
const editImagenPlatillo = ref('')
const nuevaImagenPlatillo = ref(null)


const mostrarFormularioPlatillo = ref(false)
const mostrarEditarPlatillo = ref(false)

//---------Panel de usuarios----------------
async function cargarUsuarios() {
    usuarios.value = await listarUsuarios()

}

async function guardarUsuario(){
    try{
        const passwordHash = await bcrypt.hash(nuevoPassword.value,10)
        await registrarUsuario({
            Nombre:nuevoNombre.value,
            Apellido:nuevoApellido.value,
            Correo:nuevoCorreo.value,
            Contraseña:passwordHash,
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
        const passwordHash = await bcrypt.hash(editPassword.value, 10)
        await modificarUsuario(
            usuarioEditar.value.id,
            {
                Nombre:editNombre.value,
                Apellido:editApellido.value,
                Correo:editCorreo.value,
                Contraseña:passwordHash,
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


//---------Panel de platillos----------------
function seleccionarImagen(event){
    imagenPlatillo.value = event.target.files[0]
}

function editarPlatillo(platillo) {
    platilloEditar.value = platillo

    editNombrePlatillo.value = platillo.Nombre
    editRellenoPlatillo.value = platillo.Relleno
    editCubiertoPlatillo.value = platillo.Cubierto
    editPrecioPlatillo.value = platillo.Precio
    editImagenPlatillo.value = platillo.Imagen
    mostrarEditarPlatillo.value = true
}

function seleccionarImagenEditar(event){
    nuevaImagenPlatillo.value = event.target.files[0]
}

async function cargarPlatillos() {
    platillos.value = await listarPlatillos()
}

async function guardarPlatillo() {
    try {
        //subir imagen a cloudinary
        const formData = new FormData()
        formData.append('Nombre', nombrePlatillo.value)
        formData.append('Relleno', rellenoPlatillo.value)
        formData.append('Cubierto', cubiertoPlatillo.value)
        formData.append('Precio', precioPlatillo.value)
        formData.append('Imagen', imagenPlatillo.value)
        const response = await fetch('http://localhost:3000/api/platillos', {
            method: 'POST',
            body: formData
        })
        if (!response.ok) {
            throw new Error('Error al crear el platillo')
        }
        mensaje.value = 'Platillo creado correctamente'


        await cargarPlatillos()
        nombrePlatillo.value = ''
        rellenoPlatillo.value = ''
        cubiertoPlatillo.value = ''
        precioPlatillo.value = ''
        imagenPlatillo.value = null

        mostrarFormularioPlatillo.value = false
    }
    catch (error) {
        mensaje.value = error.message
    }
}

async function guardarCambiosPlatillo() {
    try {
        const formData = new FormData()
        formData.append('Nombre', editNombrePlatillo.value)
        formData.append('Relleno', editRellenoPlatillo.value)
        formData.append('Cubierto', editCubiertoPlatillo.value)
        formData.append('Precio', editPrecioPlatillo.value)
        if (nuevaImagenPlatillo.value) {
            formData.append('Imagen', nuevaImagenPlatillo.value)
        }
        await fetch(`http://localhost:3000/api/platillos/${platilloEditar.value.id}`, {
            method: 'PUT',
            body: formData
        })
        await cargarPlatillos()
        mostrarEditarPlatillo.value = false
    }
    catch (error) {
        mensaje.value = error.message
    }
}

async function eliminarPlatillo(id) {
    await borrarPlatillo(id)
    await cargarPlatillos()
}



onMounted(() =>{
    cargarUsuarios()
    cargarPlatillos()
})
</script>