"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratistaDTO = exports.ContratanteDTO = void 0;
class ContratanteDTO {
    constructor(usuarioId, NIT) {
        this._usuarioId = usuarioId;
        this._NIT = NIT;
    }
    get usuarioId() {
        return this._usuarioId;
    }
    get NIT() {
        return this._NIT;
    }
}
exports.ContratanteDTO = ContratanteDTO;
class ContratistaDTO {
    constructor(usuarioId, cedula, categoriaTrabajo, hojaDeVida) {
        this._usuarioId = usuarioId;
        this._cedula = cedula;
        this._hojaDeVida = hojaDeVida;
        this._categoriaTrabajo = categoriaTrabajo;
    }
    get usuarioId() {
        return this._usuarioId;
    }
    get cedula() {
        return this._cedula;
    }
    get hojaDeVida() {
        return this._hojaDeVida;
    }
    get categoriaTrabajo() {
        return this._categoriaTrabajo;
    }
}
exports.ContratistaDTO = ContratistaDTO;
