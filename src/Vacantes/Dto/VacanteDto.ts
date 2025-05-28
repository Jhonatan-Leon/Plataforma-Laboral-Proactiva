class RegistrarVacante{

    private _id_usuario: string;
    private _nombre_vacante: string;
    private _persona_contacto: string;
    private _numero_contacto: string;
    private _correo_electronico: string;
    private _municipio: string;
    private _direccion: string;
    private _descripcion_vacante: string;
    private _logo: string | File | null;
    private _salario_vacante: string;
    private _disponibilidad: string;
    private _categoria_trabajo: string;


    constructor(id_usuario: string, nombre_vacante: string, personaContacto: string, numeroContacto: string, email: string, lugar: string, direccion: string, descripcion: string, logo: string | File | null, salario: string, disponibilidad: string, categoria : string) {
        this._id_usuario = id_usuario;
        this._nombre_vacante = nombre_vacante;
        this._persona_contacto = personaContacto;
        this._numero_contacto = numeroContacto;
        this._correo_electronico = email;
        this._municipio = lugar;
        this._direccion = direccion;
        this._descripcion_vacante = descripcion;
        this._logo = logo; 
        this._salario_vacante = salario;
        this._disponibilidad = disponibilidad;
        this._categoria_trabajo = categoria;
    }

    get id_usuario(): string {
        return this._id_usuario;
    }

    get nombre_vacante(): string {
        return this._nombre_vacante;
    }

    get persona_contacto(): string {
        return this._persona_contacto;
    }

    get numero_contacto(): string {
        return this._numero_contacto;
    }

    get correo_electronico(): string {
        return this._correo_electronico;
    }

    get municipio(): string {
        return this._municipio;
    }

    get direccion(): string {
        return this._direccion;
    }

    get logo(): string | File | null {
        return this._logo;
    }

    get descripcion_vacante(): string {
        return this._descripcion_vacante;  
    }

    get categoria_trabajo(): string {
        return this._categoria_trabajo;
    }

    get salario_vacante(): string {
        return this._salario_vacante;
    }

    get disponibilidad(): string {
        return this._disponibilidad;
    }

    set id_usuario(id: string) {
        this._id_usuario = id;
    }

    set nombre_vacante(nombre: string) {
        this._nombre_vacante = nombre;
    }

    set persona_contacto(persona: string) {
        this._persona_contacto = persona;
    }

    set numero_contacto(numero: string) {
        this._numero_contacto = numero;
    }

    set correo_electronico(email: string) {
        this._correo_electronico = email;
    }

    set municipio(lugar: string) {
        this._municipio = lugar;
    }

    set direccion(direccion: string) {
        this._direccion = direccion;
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


}
export default RegistrarVacante