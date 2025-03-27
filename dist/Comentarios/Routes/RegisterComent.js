"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerComentario_1 = __importDefault(require("../Controllers/ControllerComentario"));
const ControllerGet_1 = __importDefault(require("../Controllers/ControllerGet"));
const ControllerUpdate_1 = __importDefault(require("../Controllers/ControllerUpdate"));
const ControllerDelete_1 = __importDefault(require("../Controllers/ControllerDelete"));
const router = (0, express_1.Router)();
router.post('/registrarComentario', ControllerComentario_1.default);
router.get('/consultarComentario/:id_comentario', ControllerGet_1.default);
router.put('/actualizarComentario/:id_comentario', ControllerUpdate_1.default);
router.delete('/delete/:id_comentario', ControllerDelete_1.default);
exports.default = router;
