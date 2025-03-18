//Clase general
class clsGeneral{

    //Retorna fecha y hora
    static ObtenerFechaHora() {
        const now = new Date();

        const fecha = parseInt(now.toISOString().split("T")[0].replace(/-/g, "")); // YYYYMMDD
        const hora = parseInt(now.toTimeString().split(" ")[0].replace(/:/g, "")); // HHmmss

        return { fecha, hora };
    }
}

//Exportamos clsGeneral
export default clsGeneral;