import { devNull } from "node:os";

class Usuario {
    private _id: number;
    private _estadoPerfil?: string | null;
    private _email: string;
    private _telefono: string;
    private _nombreCompleto: string;
    private _descripcion: string;
    private _fotoPerfil?: string | null;
    private _password: string;

    constructor( email: string, telefono: string, nombreCompleto: string, password: string, id: number, descripcion: string, fotoPerfil?: string, estadoPerfil?: string,) {
        this._id = id;
        this._estadoPerfil = estadoPerfil ?? null;
        this._email = email;
        this._telefono = telefono;
        this._nombreCompleto = nombreCompleto;
        this._descripcion = descripcion;
        this._fotoPerfil = fotoPerfil ?? null;
        this._password = password; 
    }

    get id(): number {
        return this._id;
    }

    get estadoPerfil(): string | null {
        return this._estadoPerfil ?? null;
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
        return this._fotoPerfil ?? null;
    }
    

    get password(): string {
        return this._password;
    }

    set estadoPerfil(value: string | null) {
        this._estadoPerfil = value ?? null;
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

    set password(value: string){
        this._password = value
    }
    
}

export default Usuario;