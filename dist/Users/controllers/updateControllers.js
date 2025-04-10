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
exports.updateUser = void 0;
const generateHash_1 = __importDefault(require("../Helpers/generateHash"));
const tiposUsuario_1 = require("../DTO/tiposUsuario");
const UserServices_1 = __importDefault(require("../Services/UserServices"));
let updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const { nombreCompleto, telefono, password, descripcion, fotoPerfil, estadoPerfil, tipo_usuario, NIT, cedula, categoria_trabajo, hojaDeVida } = req.body;
        console.log(`Actualizando usuario con email: ${email}`);
        // Buscar usuario por email y obtenemos la información de la base de datos
        const user = yield UserServices_1.default.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
        // se extrae información de la baes de datos y actualiza los valores enviados
        if (nombreCompleto !== undefined && nombreCompleto !== null)
            user.nombre_usuario = nombreCompleto;
        if (telefono !== undefined && telefono !== null)
            user.telefono = telefono;
        if (password !== undefined && password !== null)
            user.password = yield (0, generateHash_1.default)(password);
        if (descripcion !== undefined && descripcion !== null)
            user.descripcion_usuario = descripcion;
        if (fotoPerfil !== undefined && fotoPerfil !== null)
            user.foto_perfil = fotoPerfil;
        if (estadoPerfil !== undefined && estadoPerfil !== null)
            user.estado_perfil = estadoPerfil;
        if (tipo_usuario !== undefined && tipo_usuario !== null && tipo_usuario !== user.tipo_usuario) {
            user.tipo_usuario = tipo_usuario;
        }
        // Guardar cambios en la base de datos
        yield UserServices_1.default.updateUser(user, email);
        let usuarioFinal = null;
        if (tipo_usuario === "Contratante" && NIT) {
            usuarioFinal = new tiposUsuario_1.ContratanteDTO(user.id_usuario, NIT !== null && NIT !== void 0 ? NIT : user.NIT);
            yield UserServices_1.default.updateContratante(usuarioFinal);
        }
        else if (tipo_usuario === "Contratista" && (cedula || categoria_trabajo || hojaDeVida)) {
            usuarioFinal = new tiposUsuario_1.ContratistaDTO(user.id_usuario, cedula !== null && cedula !== void 0 ? cedula : user.cedula, categoria_trabajo !== null && categoria_trabajo !== void 0 ? categoria_trabajo : user.categoria_trabajo, hojaDeVida !== null && hojaDeVida !== void 0 ? hojaDeVida : user.hojaDeVida);
            yield UserServices_1.default.updateContratista(usuarioFinal);
        }
        res.status(200).json({ message: "Usuario actualizado con éxito", usuario: usuarioFinal || user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
