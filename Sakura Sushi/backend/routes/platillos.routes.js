import { Router } from "express";
import { getPlatillos, getPlatilloById, crearPlatillo, putPlatillo, deletePlatillo } from '../controllers/Platillo.controller.js'
import upload from '../middleware/upload.js'

const router = Router();

router.get("/", getPlatillos);
router.get("/:id", getPlatilloById);
router.post("/", upload.single('Imagen'), crearPlatillo);
router.put("/:id", upload.single('Imagen'), putPlatillo);
router.delete("/:id", deletePlatillo);

export default router;