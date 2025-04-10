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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let authorization = req.get('Authorization');
    console.log(authorization);
    if (!authorization) {
        res.status(403).json({ status: "The Authorization header is required" });
        return;
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        res.status(401).json({ status: 'You have not sent a token' });
        return;
    }
    try {
        let decoded = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        req.body.id = decoded.data.id;
        req.body.estado_perfil = decoded.data.estado_perfil;
        req.body.rol = decoded.data.rol;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            try {
                const peticionUrl = process.env.BACKEND_URL || "http://localhost:3000";
                const refresh = yield axios_1.default.post(`${peticionUrl}/refresh`, {}, {
                    withCredentials: true,
                    // Enviar cookie
                    headers: { Cookie: req.headers.cookie }
                });
                // Asignar el nuevo token al request y continuar
                req.headers["Authorization"] = `Bearer ${refresh.data.token}`;
                return verifyToken(req, res, next);
            }
            catch (refreshError) {
                res.status(401).json({ status: "Token expired, please log in again" });
                return;
            }
        }
        res.status(403).json({ status: 'Unauthorized' });
    }
});
exports.default = verifyToken;
