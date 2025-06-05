class RegistrarVacante {
    // Propiedades
    private _id_usuario: string | undefined;
    private _nombre_vacante: string;
    private _persona_contacto: string;
    private _numero_contacto: string | null;
    private _correo_electronico: string | null;
    private _direccion: string;
    private _descripcion_vacante: string;
    private _logo: string | File | null;
    private _salario_vacante: string;
    private _disponibilidad: string;
    private _categoria_trabajo: string;

    // Constructor
    constructor(
        nombre_vacante: string, persona_contacto: string, numero_contacto: string | null, direccion: string, descripcion_vacante: string, logo: string | File | null, salario_vacante: string, disponibilidad: string, categoria_trabajo: string, id_usuario?: string, correo_electronico: string | null = null) {
        this._id_usuario = id_usuario;
        this._nombre_vacante = nombre_vacante;
        this._persona_contacto = persona_contacto;
        this._numero_contacto = numero_contacto;
        this._correo_electronico = correo_electronico;
        this._direccion = direccion;
        this._descripcion_vacante = descripcion_vacante;
        this._logo = logo;
        this._salario_vacante = salario_vacante;
        this._disponibilidad = disponibilidad;
        this._categoria_trabajo = categoria_trabajo;
    }


    get id_usuario(): string | undefined {
        return this._id_usuario;
    }

    get nombre_vacante(): string {
        return this._nombre_vacante;
    }

    get persona_contacto(): string {
        return this._persona_contacto;
    }

    get numero_contacto(): string | null {
        return this._numero_contacto;
    }

    get correo_electronico(): string | null {
        return this._correo_electronico;
    }

    get direccion(): string {
        return this._direccion;
    }

    get descripcion_vacante(): string {
        return this._descripcion_vacante;
    }

    get logo(): string | File | null {
        return this._logo;
    }

    get salario_vacante(): string {
        return this._salario_vacante;
    }

    get disponibilidad(): string {
        return this._disponibilidad;
    }

    get categoria_trabajo(): string {
        return this._categoria_trabajo;
    }

    set id_usuario(id: string | undefined) {
        this._id_usuario = id;
    }

    set nombre_vacante(nombre: string) {
        this._nombre_vacante = nombre;
    }

    set persona_contacto(persona: string) {
        this._persona_contacto = persona;
    }

    set numero_contacto(numero: string | null) {
        this._numero_contacto = numero;
    }

    set correo_electronico(email: string | null) {
        this._correo_electronico = email;
    }

    set direccion(direccion: string) {
        this._direccion = direccion;
    }

    set descripcion_vacante(descripcion: string) {
        this._descripcion_vacante = descripcion;
    }

    set logo(logo: string | File | null) {
        this._logo = logo;
    }

    set salario_vacante(salario: string) {
        this._salario_vacante = salario;
    }

    set disponibilidad(disponibilidad: string) {
        this._disponibilidad = disponibilidad;
    }

    set categoria_trabajo(categoria: string) {
        this._categoria_trabajo = categoria;
    }
}

export default RegistrarVacante;
