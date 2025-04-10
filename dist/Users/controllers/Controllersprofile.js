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
let profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.body.id;
        const estado = req.body.estado_perfil;
        res.status(200).json({ status: 'Get profile Ok', id: idUser, estado_perfil: estado });
    }
    catch (error) {
        res.status(500).json({ errorInfo: "An unknown error has occurred" });
    }
});
let deactivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifica que el usuario esté autenticado
        const userId = req.body.id;
        console.log(userId);
        if (!userId) {
            res.status(401).json({ status: "Unauthorized" });
        }
        // cambiar el estado del usuario a 'inactivo'
        const result = yield UserServices_1.default.deactivateUser(userId);
        if (!result) {
            res.status(404).json({ status: "User not found or already inactive" });
        }
        res.status(200).json({ status: "Account successfully deactivated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error inactivating account" });
    }
});
exports.default = {
    profile,
    deactivateUser
};
