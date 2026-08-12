import { obtenerPlatillos, obtenerPlatilloById, crearPlatillo, actualizarPlatillo, eliminarPlatillo} from "@/models/PlatilloModel";

export async function listarPlatillos() {
    return await obtenerPlatillos();
}

export async function obtenerPlatillo(id) {
    return await obtenerPlatilloById(id);
}

export async function registrarPlatillo(platillo) {
    if (!platillo.Nombre || !platillo.Relleno || !platillo.Cubierto || !platillo.Precio) {
        throw new Error('Todos los campos son obligatorios');
    }
    return await crearPlatillo(platillo);
}

export async function modificarPlatillo(id, datos) {
    const response = await fetch(`http://localhost:3000/api/platillos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });
    return await response.json();
}

export async function borrarPlatillo(id) {
    return await eliminarPlatillo(id);
}
