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
const VacanteDto_1 = __importDefault(require("../Dto/VacanteDto"));
const VacanteService_1 = __importDefault(require("../Services/VacanteService"));
let AñadirVacante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_vacante, descripcion_vacante, estado, ubicacion_vacante, categoria_trabajo, } = req.body;
        const vacante = yield VacanteService_1.default.Add_Vacante(new VacanteDto_1.default(nombre_vacante, descripcion_vacante, estado, ubicacion_vacante, categoria_trabajo));
        console.log(vacante);
        res.status(201).json({ status: "Register ok" });
    }
    catch (error) {
        console.log("Error: ", error);
        if ((error === null || error === void 0 ? void 0 : error.code) === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        }
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = AñadirVacante;
