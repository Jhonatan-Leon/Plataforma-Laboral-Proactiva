"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comentario {
    constructor(fecha_calificacion, reseña, calificacion) {
        this._fecha_calificacion = fecha_calificacion;
        this._reseña = reseña;
        this._calificacion = calificacion;
    }
    get fecha_calificacion() {
        return this._fecha_calificacion;
    }
    get reseña() {
        return this._reseña;
    }
    get calificacion() {
        return this._calificacion;
    }
    set fecha_calificacion(Value) {
        this._fecha_calificacion = Value;
    }
    set reseña(Value) {
        this._reseña = Value;
    }
    set calificacion(Value) {
        this._calificacion = Value;
    }
}
exports.default = Comentario;
