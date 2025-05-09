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
const mongodb_1 = require("mongodb");
const Config_db_1 = __importDefault(require("../Config/Config-db"));
const streamifier_1 = __importDefault(require("streamifier"));
class VideoRepository {
    static getBucket() {
        return __awaiter(this, void 0, void 0, function* () {
            const { bucket } = yield (0, Config_db_1.default)();
            return bucket;
        });
    }
    static uploadVideo(file) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log("Video recibido:", {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                bufferLength: (_a = file.buffer) === null || _a === void 0 ? void 0 : _a.length,
            });
            // Verifica si el archivo es un video
            if (!file.mimetype.startsWith('video/')) {
                throw new Error("El archivo no es un video.");
            }
            const bucket = yield this.getBucket();
            const readableStream = streamifier_1.default.createReadStream(file.buffer);
            // Creamos un flujo de subida para GridFS
            const uploadStream = bucket.openUploadStream(file.originalname, {
                contentType: file.mimetype,
            });
            return new Promise((resolve, reject) => {
                readableStream.pipe(uploadStream)
                    .on("error", reject)
                    .on("finish", () => resolve(uploadStream.id.toString()));
            });
        });
    }
    static eliminarVideo(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = yield this.getBucket();
                const objectId = new mongodb_1.ObjectId(fileId);
                yield bucket.delete(objectId);
                return `Video con ID ${fileId} eliminado correctamente.`;
            }
            catch (error) {
                if (error.message.includes('no such file')) {
                    return `No se encontró un video con el ID ${fileId}.`;
                }
                console.error('Error al eliminar el video:', error);
                throw new Error('Hubo un problema al intentar eliminar el video.');
            }
        });
    }
    static ObtenerVideo(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = yield this.getBucket();
                const objectId = new mongodb_1.ObjectId(fileId);
                yield bucket.find({ _id: objectId });
                return `Video con ID ${fileId} obtenido correctamente`;
            }
            catch (error) {
                if (error.message.includes('no usch file')) {
                    return `No se encontró un video con el ID ${fileId}.`;
                }
                console.error('Error al obtener el video:', error);
                throw new Error('Hubo un problema al intentar obtener el video.');
            }
        });
    }
}
exports.default = VideoRepository;
