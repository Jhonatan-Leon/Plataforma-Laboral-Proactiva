"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send(`Servidor Corriendo en el puerto: ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
    throw new Error(error.message);
});
