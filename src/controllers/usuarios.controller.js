//Librerias y rutas
import { generarToken } from "../middlewares/autenticacion.js";
import usuariosModel from "../models/usuarios.model.js";
import bcrypt from "bcrypt";

//Clase usuarioController
class UsuariosController {

  //Inserta usuario
  async create(req, res) {
    try {
      const {
        identificacion,
        username,
        nombres,
        apellidos,
        email,
        contraseña,
        estado,
        rol,
      } = req.body;

      if (await usuariosModel.getOne(identificacion))
        return res.status(400).json({ error: "El usuario ya existe" });

      const result = await usuariosModel.create({
        identificacion,
        username,
        nombres,
        apellidos,
        email,
        password: await bcrypt.hash(contraseña, 10),
        estado,
        rol,
      });

      res.status(201).json({ status: "create-ok", data: result });
    } catch (e) {
      console.error("Error en create:", e);
      res.status(500).json({ error: "No se pudo crear el usuario" });
    }
  }

  //Actualiza usuario
  async update(req, res) {
    try {
      const { id } = req.params;
      const userData = { ...req.body };

      if (!(await usuariosModel.getOne(id)))
        return res.status(404).json({ error: "Usuario no encontrado" });

      if (userData.contraseña)
        userData.password = await bcrypt.hash(userData.contraseña, 10);

      delete userData.contraseña;
      const result = await usuariosModel.update(id, userData);

      res.status(200).json({ status: "update-ok", data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Elimimna usuario
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!(await usuariosModel.getOne(id)))
        return res.status(404).json({ error: "Usuario no encontrado" });

      const result = await usuariosModel.delete(id);
      res.status(200).json({ status: "delete-ok", data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Consulta ususarios
  async getAll(req, res) {
    try {
      const result = await usuariosModel.getAll();
      res.status(200).json({ status: "getall-ok", data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Consulta un usuario
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const result = await usuariosModel.getOne(id);

      if (!result)
        return res.status(404).json({ error: "Usuario no encontrado" });

      res.status(200).json({ status: "getone-ok", data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Login
  async login(req, res) {
    try {
      const { identificacion, password } = req.body;
      const usuario = await usuariosModel.getOne(identificacion);

      if (!usuario || !(await bcrypt.compare(password, usuario.password)))
        return res.status(401).json({ error: "Credenciales incorrectas" });

      const token = generarToken(identificacion);

      res.status(200).json({ msg: "Usuario autenticado", token});
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: error.message });
    }
  }

}

export default new UsuariosController();
