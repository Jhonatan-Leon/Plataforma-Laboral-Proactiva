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
exports.deleteUserByEmail = void 0;
const UserServices_1 = __importDefault(require("../Services/UserServices"));
const deleteUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        console.log(`Intentando eliminar usuario con email: ${email}`);
        const user = yield UserServices_1.default.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
        yield UserServices_1.default.deleteUserByEmail(email);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUserByEmail = deleteUserByEmail;
