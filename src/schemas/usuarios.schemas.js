import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    identificacion: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Number,
        required: true
    },
    rol: {
        type: Number,
        required: true
    }
});

export default mongoose.model("usuarios", usuariosSchema);
