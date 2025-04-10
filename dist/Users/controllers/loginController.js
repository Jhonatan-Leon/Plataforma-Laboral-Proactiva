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
exports.loginUser = void 0;
const UserServices_1 = __importDefault(require("../Services/UserServices"));
const AuthDTO_1 = __importDefault(require("../DTO/AuthDTO"));
const generateTokens_1 = __importDefault(require("../Helpers/generateTokens"));
let loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const login = yield UserServices_1.default.login(new AuthDTO_1.default(email, password));
        console.log(login);
        if (!login.logged) {
            res.status(401).json({ status: login.status });
            return;
        }
        const secretKey = process.env.KEY_TOKEN;
        const refreshSecret = process.env.REFRESH_KEY_TOKEN;
        if (!secretKey || !refreshSecret) {
            throw new Error("Las claves KEY_TOKEN o REFRESH_KEY_TOKEN no están definidas");
        }
        const accessToken = (0, generateTokens_1.default)({ id: login.id, estado_perfil: login.estado_perfil, rol: login.rol }, secretKey, 5);
        // Refresh por 7 dias
        const refreshToken = (0, generateTokens_1.default)({ id: login.id, estado_perfil: login.estado_perfil, rol: login.rol }, refreshSecret, 7 * 24 * 60);
        // Guardar refreshToken en cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: "localhost/refresh"
        });
        console.log("NODE_ENV:", process.env.NODE_ENV);
        res.status(200).json({
            status: login.status,
            token: accessToken
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});
exports.loginUser = loginUser;
