//Librerias y rutas
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const controllerNavbar = {};

controllerNavbar.renderPage = (req, res) => {
    const { page } = req.params;
    const validPages = ["home", "reportes", "usuarios", "parametros", "configuracion"];

    if (!validPages.includes(page)) {
        return res.status(404).send("Página no encontrada");
    }
    res.render("layout", { view: `ejs/${page}.ejs` });
};
export default controllerNavbar;