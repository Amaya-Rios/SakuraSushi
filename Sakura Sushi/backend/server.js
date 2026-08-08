import express from "express";
import cors from "cors";

import platillosRoutes from './routes/platillos.routes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/platillos', platillosRoutes);

app.listen(3000, () => {
    console.log("API ejecutándose en el puerto 3000");
}); 