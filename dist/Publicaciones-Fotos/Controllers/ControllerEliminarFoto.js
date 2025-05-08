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
const FotoRepository_1 = __importDefault(require("../Repository/FotoRepository"));
const EliminarFoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        // Si no se proporciona un `fileId`, respondemos con un error
        if (!fileId) {
            res.status(400).json({ message: "Se debe proporcionar un ID de archivo" });
            return;
        }
        // Llamamos al repositorio para eliminar la foto usando el fileId
        const message = yield FotoRepository_1.default.eliminarFoto(fileId);
        res.status(200).json({
            message,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error interno" });
    }
});
exports.default = EliminarFoto;
