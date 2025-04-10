"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT
});
const db = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Confirmar conexión a base de datos
db.getConnection((err, Connection) => {
    if (err) {
        console.log("Erro Conecting: ", err);
    }
    else {
        console.log("Conected to database: ");
        Connection.release();
    }
});
exports.default = db.promise();
