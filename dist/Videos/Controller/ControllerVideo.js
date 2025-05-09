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
    // Asegúrate de que se haya cargado un archivo
    if (!req.file) {
        res.status(400).send('No se ha cargado ningún archivo.');
        return;
    }
    console.log(req.file);
    try {
        console.log("Archivo recibido en el controlador:", req.file);
        // Verificar que el archivo sea un video
        if (!req.file.mimetype.startsWith('video/')) {
            res.status(400).json({ message: "El archivo no es un video válido" });
            return;
        }
        // Subir el video al repositorio
        console.log("Subiendo video...");
        const videoId = yield RepositoryVideo_1.default.uploadVideo(req.file);
        // Devolver el ID del archivo cargado
        res.status(200).json({
            message: "Video subido correctamente",
            fileId: videoId,
        });
    }
    catch (error) {
        console.error("Error al subir el video a GridFS:", error);
        res.status(500).send("Error al subir el video");
    }
});
exports.default = SubirVideo;
