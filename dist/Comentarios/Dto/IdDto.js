"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class codDto {
    constructor(id_comentario) {
        this._id_comentario = id_comentario;
    }
    //getter
    get id_comentario() {
        return this._id_comentario;
    }
    //setter
    set id_comentario(id_comentario) {
        this._id_comentario = id_comentario;
    }
}
exports.default = codDto;
