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
const ComentarioDto_1 = __importDefault(require("../Dto/ComentarioDto"));
const ComentService_1 = __importDefault(require("../Services/ComentService"));
let Registrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fecha_calificacion, reseña, calificacion } = req.body;
        const comentario = yield ComentService_1.default.AddComent(new ComentarioDto_1.default(fecha_calificacion, reseña, calificacion));
        res.status(200).json({ message: "Comentario Registrado4324" });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ER_DUP_ENTRY") {
            res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});
exports.default = Registrar;
