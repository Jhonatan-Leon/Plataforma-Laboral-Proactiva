"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(nombreCompleto, email, telefono, password, descripcion, fotoPerfil, estadoPerfil, tipoUsuario, id) {
        this._estadoPerfil = "activo";
        this._Id = id;
        this._nombreCompleto = nombreCompleto;
        this._email = email;
        this._telefono = telefono;
        this._password = password;
        this._descripcion = descripcion;
        this._fotoPerfil = fotoPerfil !== null && fotoPerfil !== void 0 ? fotoPerfil : null;
        this._estadoPerfil = estadoPerfil;
        this._tipoUsuario = tipoUsuario;
    }
    get id() {
        return this._Id;
    }
    get estadoPerfil() {
        return this._estadoPerfil;
    }
    get email() {
        return this._email;
    }
    get telefono() {
        return this._telefono;
    }
    get nombreCompleto() {
        return this._nombreCompleto;
    }
    get descripcion() {
        return this._descripcion;
    }
    get fotoPerfil() {
        return this._fotoPerfil;
    }
    get password() {
        return this._password;
    }
    get tipoUsuario() {
        return this._tipoUsuario;
    }
    set estadoPerfil(value) {
        this._estadoPerfil = value;
    }
    set email(value) {
        this._email = value;
    }
    set telefono(value) {
        this._telefono = value;
    }
    set nombreCompleto(value) {
        this._nombreCompleto = value;
    }
    set descripcion(value) {
        this._descripcion = value;
    }
    set fotoPerfil(value) {
        this._fotoPerfil = value !== null && value !== void 0 ? value : null;
    }
    set password(value) {
        this._password = value;
    }
    set tipoUsuario(value) {
        this._tipoUsuario = value;
    }
}
exports.default = Usuario;
