"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubirFotoMiddleware_1 = __importDefault(require("../Middleware/SubirFotoMiddleware"));
const ControllerFoto_1 = __importDefault(require("../Controllers/ControllerFoto"));
const ControllerEliminarFoto_1 = __importDefault(require("../Controllers/ControllerEliminarFoto"));
const router = (0, express_1.Router)();
// Usa el middleware y el controlador
router.post("/subirfoto", SubirFotoMiddleware_1.default.single("file"), ControllerFoto_1.default);
router.delete("/eliminarfoto/:fileId", ControllerEliminarFoto_1.default);
exports.default = router;
