"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auth {
    constructor(email, password) {
        this._email = email;
        this._password = password;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    set email(email) {
        this._email = email;
    }
    set password(contraseña) {
        this._password = contraseña;
    }
}
exports.default = Auth;
