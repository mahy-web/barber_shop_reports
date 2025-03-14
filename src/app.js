import express from "express";
import path from "path";
import router from "./routes/index.routes.js";
import bodyParser from "body-parser";

const app = express();

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

// Servir archivos estáticos
app.use(express.static(path.resolve("public")));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use("/", router);

export default app;