//Librerias y rutas
import { Router } from "express";
import usuariosRoutes from "./usuarios.routes.js";

const router = Router();

// Usar las rutas de usuarios
router.use("/usuarios", usuariosRoutes);

//Exportamos router
export default router;