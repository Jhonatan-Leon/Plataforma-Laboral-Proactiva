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
const Subirfoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No se subió ningún archivo" });
            return;
        }
        const fileId = yield FotoRepository_1.default.uploadFoto(req.file);
        res.status(201).json({
            message: "Foto subida",
            fileId,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error interno" });
    }
});
exports.default = Subirfoto;
