const API_URL = "http://localhost:3000/api/platillos";

//get
export async function obtenerPlatillos() {
    const response = await fetch(API_URL);
    return await response.json();
}

export async function obtenerPlatilloById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
}

//post
export async function crearPlatillo(platillo) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(platillo)
    });
    return await response.json();
}

//put
export async function actualizarPlatillo(id, platillo) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(platillo)
    });
    return await response.json();
}

//delete
export async function eliminarPlatillo(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    return await response.json();
}
