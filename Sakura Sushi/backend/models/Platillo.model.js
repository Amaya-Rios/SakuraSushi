import db from '../firebaseAdmin.js';

export async function obtenerPlatillos() {
    const snapshot = await db.collection('Platillos').get()
    const platillos = []
    snapshot.forEach(doc => {
        platillos.push({ id: doc.id, ...doc.data() })
    })
    return platillos
}

export async function obtenerPlatilloById(id) {
    const doc = await db.collection('Platillos').doc(id).get()
    if (!doc.exists) {
        throw new Error('Platillo no encontrado')
    }
    return { id: doc.id, ...doc.data() }
}

export async function crearPlatillo(platillo) {
    const resultado = await db.collection('Platillos').add(platillo)
    return resultado.id
}

export async function actualizarPlatillo(id, datos) {
    await db.collection('Platillos').doc(id).update(datos)
}

export async function eliminarPlatillo(id) {
    await db.collection('Platillos').doc(id).delete()
}

