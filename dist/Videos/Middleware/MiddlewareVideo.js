"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Definir que los archivos subidos se almacenen en memoria
const storage = multer_1.default.memoryStorage();
// Configuración de Multer para aceptar videos
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // Limita a 100MB
    },
    fileFilter: (req, file, cb) => {
        console.log(file); // Aquí puedes verificar si el archivo se está recibiendo
        if (!file.mimetype.startsWith("video/")) {
            return cb(new Error("Solo se permiten archivos de video"));
        }
        cb(null, true); // Si el archivo es válido, continuar
    },
});
exports.default = upload;
