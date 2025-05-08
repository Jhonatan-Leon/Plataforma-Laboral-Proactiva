"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MiddlewareVideo_1 = __importDefault(require("../Middleware/MiddlewareVideo"));
const ControllerVideo_1 = __importDefault(require("../Controller/ControllerVideo"));
const router = (0, express_1.Router)();
// Ruta para subir el video
router.post("/subirvideo", MiddlewareVideo_1.default.single("file"), ControllerVideo_1.default); // El campo se llama 'file'
exports.default = router;
