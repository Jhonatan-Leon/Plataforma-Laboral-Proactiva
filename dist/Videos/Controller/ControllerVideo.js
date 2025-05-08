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
const RepositoryVideo_1 = __importDefault(require("../Repository/RepositoryVideo")); // Importa el repositorio de videos
const SubirVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Archivo recibido en el controlador:", req.file);
        if (!req.file) {
            res.status(400).json({ message: "No se subió ningún archivo" });
            return;
        }
        // Verificamos que el archivo sea un video
        if (!req.file.mimetype.startsWith('video/')) {
            res.status(400).json({ message: "El archivo no es un video válido" });
            return;
        }
        console.log("Subiendo video...");
        const videoId = yield RepositoryVideo_1.default.uploadVideo(req.file); // Si hay algún error en la subida, lo atrapará el catch
        console.log("Video subido con éxito.");
        res.status(201).json({
            message: "Video subido exitosamente",
            videoId,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error interno al subir el video", error: error.message });
    }
});
exports.default = SubirVideo;
