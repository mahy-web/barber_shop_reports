import "dotenv/config";
import mongoose from "mongoose";

//Clase base de datos
class database {

  //constructor
  constructor() {
    this.conectarBaseDatos();
  }

  //Conecta base de datos
  async conectarBaseDatos() {
    try {
      const { USER_DB, PASS_DB, SERVER_DB, APP_NAME } = process.env;

      if (!USER_DB || !PASS_DB || !SERVER_DB || !APP_NAME) {
        throw new Error("⚠️ Faltan variables de entorno en .env");
      }

      const queryString = `mongodb+srv://${encodeURIComponent(USER_DB)}:${encodeURIComponent(PASS_DB)}@${SERVER_DB}/${APP_NAME}?retryWrites=true&w=majority`;

      await mongoose.connect(queryString, {
        tls: true, // Habilitar TLS
        tlsInsecure: true, // Permitir certificados no válidos
      });

      console.log("✅ Conexión a MongoDB exitosa");
    } catch (error) {
      console.error("❌ Error al conectar a MongoDB:", error);
    }
  }

  //Cierra conexion base de datos
  async cerrarConexion() {
    try {
      await mongoose.disconnect();
      console.log("🔌 Conexión cerrada correctamente");
    } catch (error) {
      console.error("❌ Error al cerrar la base de datos:", error);
    }
  }

}

const dbInstance = new database();
export default dbInstance;
