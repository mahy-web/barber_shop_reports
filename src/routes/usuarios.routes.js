// Librerías y rutas
import { Router } from "express";
import usuariosController from "../controllers/usuarios.controller.js";
import { validarToken } from "../middlewares/autenticacion.js";

const usuariosRouter = Router();

// Rutas usuarios API
usuariosRouter.post("/", validarToken, usuariosController.create);
usuariosRouter.get("/:id", usuariosController.getOne);
usuariosRouter.get("/", usuariosController.getAll);
usuariosRouter.put("/:id", validarToken, usuariosController.update);
usuariosRouter.delete("/:id", validarToken, usuariosController.delete);
usuariosRouter.post("/login", usuariosController.login);

//Exportamos usuariosRouter
export default usuariosRouter;
