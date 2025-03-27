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
exports.BrowseRepository2 = exports.DeleteRepository = exports.UpdateRepository = exports.BrowseRepository = exports.VacanteRepository = void 0;
const config_db_1 = __importDefault(require("../Config/config-db"));
class VacanteRepository {
    static AddVacante(RegisterVacante) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO vacante (nombre_vacante, descripcion_vacante, estado, ubicacion_vacante, categoria_trabajo) VALUES ($1,$2,$3,$4,$5)';
            const values = [RegisterVacante.nombre_vacante, RegisterVacante.descripcion_vacante, RegisterVacante.estado, RegisterVacante.ubicacion_vacante, RegisterVacante.categoria_trabajo];
            console.log(sql, values);
            return config_db_1.default.query(sql, values);
        });
    }
}
exports.VacanteRepository = VacanteRepository;
class BrowseRepository {
    static buscar(cod_vacante) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM vacante WHERE cod_vacante=$1';
            const values = [cod_vacante.cod_vacante];
            console.log(sql, values);
            return config_db_1.default.query(sql, values);
        });
    }
}
exports.BrowseRepository = BrowseRepository;
class BrowseRepository2 {
    static buscar(categoria_trabajo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM vacante WHERE categoria_trabajo=$1';
            const values = [categoria_trabajo.categoria_trabajo];
            console.log(sql, values);
            return config_db_1.default.query(sql, values);
        });
    }
}
exports.BrowseRepository2 = BrowseRepository2;
class UpdateRepository {
    static updateVacante(cod_vacante, vacante) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE vacante SET nombre_vacante=$1, descripcion_vacante=$2, estado=$3, ubicacion_vacante=$4, categoria_trabajo=$5  WHERE cod_vacante=$6';
            const values = [vacante.nombre_vacante, vacante.descripcion_vacante, vacante.estado, vacante.ubicacion_vacante, vacante.categoria_trabajo, cod_vacante.cod_vacante];
            console.log(sql, values);
            return config_db_1.default.query(sql, values);
        });
    }
}
exports.UpdateRepository = UpdateRepository;
class DeleteRepository {
    static deleteVacante(cod_vacante) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM vacante WHERE cod_vacante=$1';
            const values = [cod_vacante.cod_vacante];
            console.log(sql, values);
            return config_db_1.default.query(sql, values);
        });
    }
}
exports.DeleteRepository = DeleteRepository;
