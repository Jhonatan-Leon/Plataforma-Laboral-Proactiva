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
Object.defineProperty(exports, "__esModule", { value: true });
const VacanteRepository_1 = require("../Repository/VacanteRepository");
class GestionVacantes {
    static Add_Vacante(register) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VacanteRepository_1.VacanteRepository.AddVacante(register);
        });
    }
    static browse_vacant(vacant) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VacanteRepository_1.BrowseRepository.buscar(vacant);
        });
    }
    static browse_vacant2(vacante) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VacanteRepository_1.BrowseRepository2.buscar(vacante);
        });
    }
    static Editar_vacant(Edit, vacant) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VacanteRepository_1.UpdateRepository.updateVacante(vacant, Edit);
        });
    }
    static Eliminar_vacant(vacant) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VacanteRepository_1.DeleteRepository.deleteVacante(vacant);
        });
    }
}
exports.default = GestionVacantes;
