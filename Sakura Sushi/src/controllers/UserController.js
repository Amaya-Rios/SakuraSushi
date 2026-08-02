import {crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario} from '../models/UserModel.js'

export async function registrarUsuario(usuario) {
    if (!usuario.Correo) {
        throw new Error('El correo es obligatorio');
    }   
    return await crearUsuario(usuario)
}

export async function listarUsuarios() {
    return await obtenerUsuarios()
}

export async function modificarUsuario(id,usuario) {
    return await actualizarUsuario(id,usuario)
}

export async function borrarUsuario(id) {
    return await eliminarUsuario(id)
}