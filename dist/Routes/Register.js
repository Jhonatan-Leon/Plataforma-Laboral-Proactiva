"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddVacante_1 = __importDefault(require("../Controllers/AddVacante"));
const BrowseVacante_1 = require("../Controllers/BrowseVacante");
const UpdateVacante_1 = __importDefault(require("../Controllers/UpdateVacante"));
const DeleteVacante_1 = __importDefault(require("../Controllers/DeleteVacante"));
const router = (0, express_1.Router)();
router.post('/registrarVacante', AddVacante_1.default);
router.get('/consultarVacante/:cod_vacante', BrowseVacante_1.buscarVacante);
router.get('/consultarVacante', BrowseVacante_1.buscarVacante2);
router.put('/update/:cod_vacante', UpdateVacante_1.default);
router.delete('/delete/:cod_vacante', DeleteVacante_1.default);
exports.default = router;
