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
exports.getByRol = exports.getUserById = void 0;
const UserServices_1 = __importDefault(require("../Services/UserServices"));
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(`Buscando usuario con ID: ${id}`);
        const user = yield UserServices_1.default.getUserById(id);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario encontrado", usuario: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const getByRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_usuario } = req.params;
        console.log(tipo_usuario);
        let tipo;
        if (tipo_usuario == "Contratista") {
            tipo = yield UserServices_1.default.getByRol(tipo_usuario);
        }
        else if (tipo_usuario == "Contratante") {
            tipo = yield UserServices_1.default.getByRol(tipo_usuario);
        }
        if (!tipo) {
            res.status(404).json({ message: "Usuario no encontrados " });
        }
        res.status(200).json({ message: `Usuarios tipo ${tipo_usuario} encontrados: `, tipo });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
});
exports.getByRol = getByRol;
