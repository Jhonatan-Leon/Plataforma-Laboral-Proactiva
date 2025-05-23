import EstadoUser from "../DTO/EstadoUser";

abstract class Usuario {
    protected _Id?: Number;
    protected _nombreCompleto: string;
    protected _email: string;
    protected _telefono: string;
    protected _telefono2?: string | null;
    protected _password: string;
    protected _descripcion: string;
    protected _fotoPerfil: string | File | null;
    protected _municipio: string;
    protected _tipoDocumento: TipoDocumento;
    protected _NumeroCedula: Number;
    protected _genero: TipoGenero;
    protected _estadoPerfil: EstadoUser;
    protected _tipoUsuario: TipoUsuario;

    constructor( nombreCompleto: string, email: string, telefono: string, telefono2: string, password: string, descripcion: string, fotoPerfil: string | File | null, municipio: string, tipoDocumento: TipoDocumento, NumeroCedula: Number, genero: TipoGenero,
        estadoPerfil: EstadoUser,  tipoUsuario: TipoUsuario, id?: number) { 
        this._Id = id;
        this._nombreCompleto = nombreCompleto;
        this._email = email;
        this._telefono = telefono;
        this._telefono2 = telefono2;
        this._password = password;
        this._descripcion = descripcion;
        this._fotoPerfil = fotoPerfil ?? null;
        this._estadoPerfil = estadoPerfil ?? EstadoUser.Activo;
        this._tipoUsuario = tipoUsuario;
        this._genero = genero;
        this._municipio = municipio;
        this._tipoDocumento = tipoDocumento;
        this._NumeroCedula = NumeroCedula;
    }

    get id():Number | undefined {
        return this._Id;
    }

    get estadoPerfil(): EstadoUser {
        return this._estadoPerfil;
    }

    get email(): string {
        return this._email;
    }

    get telefono(): string {
        return this._telefono;
    }

    get telefono2(): string | null{
        return this._telefono2 ?? null;
    }

    get nombreCompleto(): string {
        return this._nombreCompleto;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    get fotoPerfil(): string | File | null {
        return this._fotoPerfil;
    }

    get password(): string {
        return this._password;
    }

    get tipoUsuario():  TipoUsuario {
        return this._tipoUsuario;
    }

    get municipio(): string {
        return this._municipio;
    }
    
    get genero(): TipoGenero {
        return this._genero;
    }

    get NumeroCedula(): Number {
        return this._NumeroCedula;
    }

    get tipoDocumento(): TipoDocumento {
        return this._tipoDocumento;
    }

    set NumeroCedula(value: Number){
        this._NumeroCedula = value;
    }

    set tipoDocumento(value: TipoDocumento){
        this._tipoDocumento = value;
    }

    set genero(value: TipoGenero){
        this._genero = value;
    }

    set municipio(value: string){
        this._municipio = value;
    }

    set telefono2(value: string | null){
        this._telefono2 = value ?? null;
    }   

    set estadoPerfil(value:EstadoUser) {
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

    set fotoPerfil(value: string | File | null) {
        this._fotoPerfil = value ?? null;
    }

    set password(value: string) {
        this._password = value;
    }

    set tipoUsuario(value: TipoUsuario) {
        this._tipoUsuario = value;
    }
}


export default Usuario;