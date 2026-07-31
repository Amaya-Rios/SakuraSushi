export function validarCorreo(correo){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

export function validarPassword(password){
    const regex = /^(?=.*[a-z])(?=.*[A-Z]){8,}$/;
    return regex.test(password);
}

//para validaciones de firebase
import {db} from "../config/firebase.js";
import {collection, query, where, getDocs} from "firebase/firestore";
export async function autenticarUsuario(correo, password) {
    const q = query(collection(db, "User"), where("Correo", "==", correo), where("Contraseña", "==", password));
    const snapshot = await getDocs(q);
    if (snapshot.empty) { //si el correo no existe
        return {
            success: false,
            message: "El usuario no está registrado"
        };
    }

    const usuario = snapshot.docs[0].data();
    if (usuario.Contraseña !== password) { //si la contraseña es incorrecta
        return {
            success: false,
            message: "Contraseña incorrecta"
        };
    }

    return {
        success: true,
        message: "Autenticación exitosa",
        usuario: usuario
    };

}

/*//prueba de conección a firebase
export async function obtenerUsuarios() {
    const snapshot = await getDocs(collection(db, "User"));
    snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}*/