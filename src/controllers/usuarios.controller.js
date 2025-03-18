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
        password,
        estado,
        rol,
        usuarioCreacion,
      } = req.body;

      // Verificar campos obligatorios
      if (!password) {
        return res
          .status(400)
          .json({ error: "El campo password es requerido" });
      }
      if (!usuarioCreacion) {
        return res
          .status(400)
          .json({ error: "El campo usuarioCreacion es requerido" });
      }

      // Verificar si el usuario ya existe
      const usuarioExistente = await usuariosModel.getOne(identificacion);
      if (usuarioExistente) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      // Encriptar contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const result = await usuariosModel.create({
        identificacion,
        username,
        nombres,
        apellidos,
        email,
        password: hashedPassword,
        estado,
        rol,
        usuarioCreacion,
      });

      res.status(201).json({ status: "create-ok", data: result });
    } catch (error) {
      console.error("Error en create:", error);
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

      if (userData.password)
        userData.password = await bcrypt.hash(userData.password, 10);

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

      if (!usuario) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }

      const token = generarToken(identificacion);
      res.status(200).json({ msg: "Usuario autenticado", token });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: error.message });
    }
  }

}

//Exportamos UsuariosController
export default new UsuariosController();
