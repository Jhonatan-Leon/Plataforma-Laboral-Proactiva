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
const VacanteService_1 = __importDefault(require("../Services/VacanteService"));
const ConsultaDto_1 = require("../Dto/ConsultaDto");
let EliminarVacante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cod_vacante = parseInt(req.params.cod_vacante);
        console.log("Info", cod_vacante);
        const encontrar = yield VacanteService_1.default.Eliminar_vacant(new ConsultaDto_1.codDto(cod_vacante));
        console.log(encontrar);
        res.status(201).json({
            status: 'lista',
            encontrar: encontrar
        });
    }
    catch (error) {
        console.log("Error: ", error);
        if ((error === null || error === void 0 ? void 0 : error.code) === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        }
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = EliminarVacante;
