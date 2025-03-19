//Librerias y rutas
import { Router } from "express";
import controllerNavbar from "../controllers/navbar.controller.js";

const navbarRouter = Router();

// Ruta dinámica para manejar todas las vistas
navbarRouter.get("/:page", controllerNavbar.renderPage);

export default navbarRouter;