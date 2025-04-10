"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens_1 = __importDefault(require("../Helpers/generateTokens"));
const refreshToken = (req, res) => {
    try {
        const refreshSecret = process.env.REFRESH_KEY_TOKEN;
        if (!refreshSecret) {
            throw new Error("REFRESH_KEY_TOKEN no está definido");
        }
        const refreshToken = req.cookies.refreshToken;
        console.log("Refresh Token recibido:", refreshToken);
        if (!refreshToken) {
            res.status(403).json({ error: "No autorizado" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, refreshSecret);
            console.log(decoded.data.id, decoded.data.estado_perfil, decoded.data.rol);
            if (!decoded.data.id || !decoded.data.estado_perfil || !decoded.data.rol) {
                res.status(400).json({ error: "Token inválido" });
                return;
            }
            const secretKey = process.env.KEY_TOKEN;
            if (!secretKey) {
                throw new Error("KEY_TOKEN no está definido");
            }
            const newAccessToken = (0, generateTokens_1.default)({ id: decoded.data.id, estado_perfil: decoded.data.estado_perfil, rol: decoded.data.rol }, secretKey, 5);
            res.status(200).json({ token: newAccessToken });
            return;
        }
        catch (err) {
            res.status(403).json({ error: "Token inválido o expirado" });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
        return;
    }
};
exports.default = refreshToken;
