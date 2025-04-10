"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Routes_1 = __importDefault(require("./Users/Routes/User_Routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const Login_Routes_1 = __importDefault(require("./Users/Routes/Login_Routes"));
const profileUser_1 = __importDefault(require("./Users/Routes/profileUser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/Users', User_Routes_1.default);
app.use('/login', Login_Routes_1.default);
app.use('/Profile', profileUser_1.default);
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
    throw new Error(error.message);
});
