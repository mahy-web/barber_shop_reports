// Librerías y rutas
import "dotenv/config";
import app from "./app.js";
import dbInstance from "./config/database.js";

// Servidor encendido
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("🛑 Cerrando servidor...");
  await dbInstance.cerrarConexion();
  process.exit(0);
});
