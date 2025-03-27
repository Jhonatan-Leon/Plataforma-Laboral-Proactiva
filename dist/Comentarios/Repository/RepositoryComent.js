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
exports.GetComent = exports.DeleteComent = exports.UpdateComent = exports.ComentarioRepositorio = void 0;
const config_db_1 = __importDefault(require("../config/config-db"));
class ComentarioRepositorio {
    static add(ComentarioR) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO comentario (fecha_calificacion, reseña, calificacion) VALUES ($1,$2,$3)';
            const values = [ComentarioR.fecha_calificacion, ComentarioR.reseña, ComentarioR.calificacion];
            return yield config_db_1.default.query(sql, values);
        });
    }
}
exports.ComentarioRepositorio = ComentarioRepositorio;
class UpdateComent {
    static updateComent(Cod_Coment, comentario) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE comentario SET fecha_calificacion=$1, reseña=$2, calificacion=$3 WHERE id_comentario=$4';
            const values = [comentario.fecha_calificacion, comentario.reseña, comentario.calificacion, Cod_Coment.id_comentario];
            console.log(sql, values);
            return config_db_1.default.query(sql, values);
        });
    }
}
exports.UpdateComent = UpdateComent;
class DeleteComent {
    static deleteComent(Cod_coment) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM comentario WHERE id_comentario=$1';
            const values = [Cod_coment.id_comentario];
            console.log(sql, values);
            return config_db_1.default.query(sql, values);
        });
    }
}
exports.DeleteComent = DeleteComent;
class GetComent {
    static getComent(Cod_coment) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM comentario WHERE id_comentario=$1';
            const values = [Cod_coment.id_comentario];
            console.log(sql, values);
            return config_db_1.default.query(sql, values);
        });
    }
}
exports.GetComent = GetComent;
