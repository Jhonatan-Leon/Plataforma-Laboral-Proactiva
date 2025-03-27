

class Usuario {
    private _Id?: Number;
    private _nombreCompleto: string;
    private _email: string;
    private _telefono: string;
    private _password: string;
    private _descripcion: string;
    private _fotoPerfil: string | null;
    private _estadoPerfil: "activo" | "inactivo" = "activo";
    private _tipoUsuario: "Contratante" | "Contratista";

    constructor( nombreCompleto: string, email: string, telefono: string, password: string, descripcion: string, fotoPerfil: string | null, estadoPerfil: "activo" | "inactivo",  tipoUsuario: "Contratante" | "Contratista", id?: number) { 
        this._Id = id;
        this._nombreCompleto = nombreCompleto;
        this._email = email;
        this._telefono = telefono;
        this._password = password;
        this._descripcion = descripcion;
        this._fotoPerfil = fotoPerfil ?? null;
        this._estadoPerfil = estadoPerfil;
        this._tipoUsuario = tipoUsuario;
    }

    get id():Number | undefined {
        return this._Id;
    }

    get estadoPerfil(): "activo" | "inactivo" {
        return this._estadoPerfil;
    }

    get email(): string {
        return this._email;
    }

    get telefono(): string {
        return this._telefono;
    }

    get nombreCompleto(): string {
        return this._nombreCompleto;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    get fotoPerfil(): string | null {
        return this._fotoPerfil;
    }

    get password(): string {
        return this._password;
    }

    get tipoUsuario(): "Contratante" | "Contratista" {
        return this._tipoUsuario;
    }
    

    set estadoPerfil(value: "activo" | "inactivo") {
        this._estadoPerfil = value;
    }

    set email(value: string) {
        this._email = value;
    }

    set telefono(value: string) {
        this._telefono = value;
    }

    set nombreCompleto(value: string) {
        this._nombreCompleto = value;
    }

    set descripcion(value: string) {
        this._descripcion = value;
    }

    set fotoPerfil(value: string | null) {
        this._fotoPerfil = value ?? null;
    }

    set password(value: string) {
        this._password = value;
    }

    set tipoUsuario(value: "Contratante" | "Contratista") {
        this._tipoUsuario = value;
    }
}


export default Usuario;