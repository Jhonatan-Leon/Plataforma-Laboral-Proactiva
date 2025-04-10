"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_1 = __importDefault(require("../Services/UserServices"));
const UserDto_1 = __importDefault(require("../DTO/UserDto"));
const tiposUsuario_1 = require("../DTO/tiposUsuario");
let register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombreCompleto, email, telefono, password, descripcion, fotoPerfil, estadoPerfil, tipo_usuario, NIT, cedula, categoria_trabajo, hojaDeVida } = req.body;
        console.log(`Variables recibidas: Id: ${id} nombre: ${nombreCompleto}, email: ${email}, telefono: ${telefono}, password: ${password} ,
            descripcion: ${descripcion}, fotoPerfil: ${fotoPerfil}, tipo_usuario: ${tipo_usuario}, NIT: ${NIT}, cedula: ${cedula}, categoriaTrabajo: ${categoria_trabajo}, hojaDeVida: ${hojaDeVida}`);
        const User = yield UserServices_1.default.registerUser(new UserDto_1.default(nombreCompleto, email, telefono, password, descripcion, fotoPerfil, estadoPerfil, tipo_usuario));
        console.log("id: ", User);
        let usuarioFinal;
        if (tipo_usuario === "Contratante" && NIT) {
            usuarioFinal = new tiposUsuario_1.ContratanteDTO(User, NIT);
            yield UserServices_1.default.registerContratante(usuarioFinal);
        }
        else if (tipo_usuario === "Contratista" && cedula && categoria_trabajo) {
            usuarioFinal = new tiposUsuario_1.ContratistaDTO(User, cedula, categoria_trabajo, hojaDeVida);
            yield UserServices_1.default.registerContratista(usuarioFinal);
        }
        else {
            throw new Error("Datos insuficientes para registrar un Contratante o Contratista");
        }
        res.status(201).json({ message: "Usuario registrado con éxito", usuario: usuarioFinal });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.default = register;
