//Librerias y rutas
import usuariosSchemas from "../schemas/usuarios.schemas.js";

//Clase uduarios modelo
class UsuariosModel {

  //Crea usuario
  async create(usuario) {
    try {
      return await usuariosSchemas.create(usuario);
    } catch (error) {
      console.error("Error en usuariosModel.create:", error);
      throw new Error("No se pudo crear el usuario");
    }
  }

  //Actualiza usuario
  async update(id, userData) {
    try {
      if ("_id" in userData) delete userData._id; //no modifica _id
      return await usuariosSchemas.findOneAndUpdate(
        { identificacion: id },
        userData,
        { new: true }
      );
    } catch (error) {
      console.error("Error en usuariosModel.update:", error);
      throw new Error("No se pudo modificar el usuario");
    }
  }

  //Elimina usuario
  async delete(id) {
    try {
      return await usuariosSchemas.findOneAndDelete({ identificacion: id });
    } catch (error) {
      console.error("Error en usuariosModel.delete:", error);
      throw new Error("No se pudo eliminar el usuario");
    }
  }

  //Consulta usuarios
  async getAll() {
    try {
      return await usuariosSchemas.find({});
    } catch (error) {
      console.error("Error en usuariosModel.getAll:", error);
      throw new Error("No se pudieron obtener los usuarios");
    }
  }

  //Consulta un usurio
  async getOne(id) {
    try {
      const result = await usuariosSchemas.findOne({ identificacion: id });
      return result;
    } catch (error) {
      console.error("Error en usuariosModel.getOne:", error);
      throw new Error("No se pudo consultar el usuario");
    }
  }

}

//Exportamos UsuariosModel
export default new UsuariosModel();