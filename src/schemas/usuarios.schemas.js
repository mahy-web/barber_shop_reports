// Librerias y rutas
import mongoose from "mongoose";
import usuariosMiddleware from "../middlewares/usuarios.middleware.js";

//Esquema usaurios
const usuariosSchema = new mongoose.Schema({
    identificacion: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, trim: true },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    estado: { type: Number, required: true },
    rol: { type: Number, required: true },
    usuarioCreacion: { type: String, required: true},
    usuarioModificacion: { type: String },
    fechaCreacion: { type: Number }, // YYYYMMDD
    horaCreacion: { type: Number }, // HHmmss
    fechaModificacion: { type: Number }, // YYYYMMDD
    horaModificacion: { type: Number }, // HHmmss
}, { timestamps: false } );

// Aplicamos los middlewares al esquema
usuariosMiddleware(usuariosSchema);

// Exportamos el modelo usuariosSchema
export default mongoose.model("Usuario", usuariosSchema);