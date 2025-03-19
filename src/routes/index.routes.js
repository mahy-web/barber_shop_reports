//Librerias y rutas
import { Router } from "express";
import navbarRouter from "./navbar.routes.js";
import usuariosRoutes from "./usuarios.routes.js";

const router = Router();

// Usar las rutas navbar
router.use("/inicio", navbarRouter);
// Usar las rutas de usuarios
router.use("/usuarios", usuariosRoutes);

//Exportamos router
export default router;