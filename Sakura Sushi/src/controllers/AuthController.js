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
import bcrypt from "bcryptjs";

export async function autenticarUsuario(correo, password) {

    const q = query(
        collection(db, "User"),
        where("Correo", "==", correo)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

        return {
            success: false,
            message: "El usuario no está registrado"
        };

    }

    const usuario = snapshot.docs[0].data();

    const passwordGuardada =
        usuario.Contraseña;

    // Contraseña hasheada
    if (passwordGuardada.startsWith('$2')) {

        const coincide =
            await bcrypt.compare(
                password,
                passwordGuardada
            );

        if (!coincide) {

            return {
                success: false,
                message: "Contraseña incorrecta"
            };

        }

    }
    else {

        // Contraseña en texto plano
        if (passwordGuardada !== password) {

            return {
                success: false,
                message: "Contraseña incorrecta"
            };

        }

    }

    return {

        success: true,
        message: "Autenticación exitosa",
        usuario

    };

}

//Para hacer cerrar sesión de usuario
import { auth } from "../config/firebase.js";
import { signOut } from "firebase/auth";
export async function cerrarSesion() {
    await signOut(auth);
}


/*//prueba de conección a firebase
export async function obtenerUsuarios() {
    const snapshot = await getDocs(collection(db, "User"));
    snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}*/