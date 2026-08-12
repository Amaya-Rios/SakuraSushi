import {db} from "../config/firebase.js";
import {collection, addDoc, getDocs, updateDoc, deleteDoc, doc} from "firebase/firestore";

export async function crearUsuario(usuario) {
    return await addDoc(collection(db, "User"), usuario)
}

export async function obtenerUsuarios() {
    const snapshot = await getDocs(collection(db, "User"))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function actualizarUsuario(id, datos) {
    await updateDoc(doc(db, "User", id), datos)
}

export async function eliminarUsuario(id) {
    return await deleteDoc(doc(db, "User", id))
}
