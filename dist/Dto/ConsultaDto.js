"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaDto = exports.codDto = void 0;
class codDto {
    constructor(cod_vacante) {
        this._cod_vacante = cod_vacante;
    }
    //getter
    get cod_vacante() {
        return this._cod_vacante;
    }
    //setter
    set cod_vacante(cod_vacante) {
        this._cod_vacante = cod_vacante;
    }
}
exports.codDto = codDto;
class categoriaDto {
    constructor(categoria_trabajo) {
        this._categoria_trabajo = categoria_trabajo;
    }
    //  Getter
    get categoria_trabajo() {
        return this._categoria_trabajo;
    }
    //  Setter
    set categoria_trabajo(categoria_trabajo) {
        this._categoria_trabajo = categoria_trabajo;
    }
}
exports.categoriaDto = categoriaDto;
