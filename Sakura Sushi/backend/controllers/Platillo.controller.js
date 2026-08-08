import { obtenerPlatillos, obtenerPlatilloById, crearPlatillo as crearPlatilloModel, actualizarPlatillo, eliminarPlatillo } from '../models/Platillo.model.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';


export const getPlatillos = async (req, res) => {
    const datos = await obtenerPlatillos();
    res.json(datos);
}

export const getPlatilloById = async (req, res) => {
    const id = req.params.id;
    try {
        const datos = await obtenerPlatilloById(id);
        res.json(datos);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export async function crearPlatillo(req, res) {
    try {
        const resultadoCloudinary = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: 'platillos' }, (error, result) => {
                if (error) 
                    reject (error)
                else
                    resolve(result)
            });
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
        const platillo = {
            Nombre: req.body.Nombre,
            Relleno: req.body.Relleno,
            Cubierto: req.body.Cubierto,
            Precio: req.body.Precio,
            Imagen: resultadoCloudinary.secure_url
        };
        const id = await crearPlatilloModel(platillo);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const putPlatillo = async (req, res) => {
    try{
        const datos = {
            Nombre: req.body.Nombre,
            Relleno: req.body.Relleno,
            Cubierto: req.body.Cubierto,
            Precio: req.body.Precio
        }
        if (req.file) {
            const resultadoCloudinary = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'platillos' }, (error, result) => {
                    if (error) 
                        reject (error)
                    else
                        resolve(result)
                })
                streamifier.createReadStream(req.file.buffer).pipe(stream)
            })
            datos.Imagen = resultadoCloudinary.secure_url
        }
        await actualizarPlatillo(req.params.id, datos);
        res.json({ message: 'Platillo actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const deletePlatillo = async (req, res) => {
    await eliminarPlatillo(req.params.id);
    res.json({ message: 'Platillo eliminado correctamente' });
}

