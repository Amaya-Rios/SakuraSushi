export function validarCorreo(correo){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

export async function login(email, password) {
    if (!validarCorreo(email)) {
        throw new Error("Correo inválido");
    }
}