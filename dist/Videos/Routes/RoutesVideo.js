"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MiddlewareVideo_1 = __importDefault(require("../Middleware/MiddlewareVideo"));
const ControllerVideo_1 = __importDefault(require("../Controller/ControllerVideo"));
const ControllerEliminarVideo_1 = __importDefault(require("../Controller/ControllerEliminarVideo"));
const ControllerObtenerVideo_1 = __importDefault(require("../Controller/ControllerObtenerVideo"));
const router = (0, express_1.Router)();
router.post("/subirvideo", MiddlewareVideo_1.default.single("file"), ControllerVideo_1.default);
router.delete("/eliminarvideo/:fileId", ControllerEliminarVideo_1.default);
router.get("/obtenervideo/:fileId", ControllerObtenerVideo_1.default);
exports.default = router;
