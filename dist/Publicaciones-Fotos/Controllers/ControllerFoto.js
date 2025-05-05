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
const Config_db_1 = __importDefault(require("../Config/Config-db"));
let Subirfoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bucket } = yield (0, Config_db_1.default)();
        if (!req.file) {
            return res.status(400).json({ message: "No se subio ninguna imagen" });
        }
        const readableStream = require("streamifier").createReadStream(req.file.buffer);
        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            contentType: req.file.mimetype,
        });
        readableStream.pipe(uploadStream)
            .on("error", (error) => {
            console.log("Error subiendo la imagen", error);
            res.status(500).json({ message: "Error al subir la imagen" });
        })
            .on("finish", () => {
            res.status(201).json({ message: "imagen subida", id: uploadStream.id });
        });
    }
    catch (error) {
        console.log("Error en subir foto", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.default = Subirfoto;
