"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT) || 5432,
    max: 10,
});
db.connect()
    .then((client) => {
    console.log("Connected to PostgreSQL database!");
    client.release();
})
    .catch((err) => {
    console.error("Error connecting to database:", err);
});
exports.default = db;
