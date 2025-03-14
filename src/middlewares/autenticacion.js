import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
import usuariosModel from "../models/usuarios.model.js";

export function generarToken(identificacion) {
    return jsonwebtoken.sign({ identificacion }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1h" });
}

export async function validarToken(req, res, next) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) return res.status(401).json({ error: "Token requerido" });

        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        
        const usuario = await usuariosModel.getOne(dataToken.identificacion);
        if (!usuario) return res.status(401).json({ error: "Usuario no encontrado" });

        req.user = usuario;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token no válido" });
    }
}
