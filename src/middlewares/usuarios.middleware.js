// Librerias y rutas
import clsGeneral from "../utils/clsGeneral.js";

const usuariosMiddleware = (schema) => {
    // Middleware para la creación de un usuario
    schema.pre("save", function (next) {
        if (this.isNew) {
            const { fecha, hora } = clsGeneral.ObtenerFechaHora();
            this.fechaCreacion = fecha;
            this.horaCreacion = hora;
        }
        next();
    });

    // Middleware para la modificación
    schema.pre("findOneAndUpdate", function (next) {
        const { fecha, hora } = clsGeneral.ObtenerFechaHora();

        // Se usa `this._update.$set` para modificar los datos en la actualización
        this._update.$set = { 
            ...this._update.$set,
            fechaModificacion: fecha,
            horaModificacion: hora
        };
        
        next();
    });
}

//Exportamos usuariosMiddleware
export default usuariosMiddleware;
