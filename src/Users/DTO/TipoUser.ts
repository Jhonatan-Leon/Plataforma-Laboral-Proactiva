import EstadoUser from "./EstadoUser";
import Usuario from "./UserDto";
import TipoDocumento from "./TipoDocumento";

class ContratanteDTO extends Usuario {
    private _NIT: string;
    private _sector: string;
    private _sitio_web: string;

    constructor(NIT: string, sector: string, sitio_web: string,  nombreCompleto: string, email: string, telefono: string, telefono2: string, password: string, descripcion: string, fotoPerfil: string | File | null, municipio: string, tipoDocumento:TipoDocumento, NumeroCedula: Number, genero: TipoGenero, estadoPerfil: EstadoUser,  
         tipoUsuario: TipoUsuario, id?: number ) {
        super(nombreCompleto, email, telefono, telefono2, password, descripcion, fotoPerfil, municipio, tipoDocumento, NumeroCedula, genero, estadoPerfil, tipoUsuario, id)
        this._NIT = NIT;
        this._sector = sector;
        this._sitio_web = sitio_web;
    }

    get NIT(): string {
        return this._NIT;
    }

    set NIT(value: String){
        this.NIT = value;
    }

    get sitio_web(): string {
        return this._sitio_web;
    }

    set sitio_web(value: String){
        this.sitio_web = value;
    }

    get sector(): string {
        return this._sector;
    }

    set sector(value: string){
        this._sector = value;
    }
}

class ContratistaDTO extends Usuario {
    private _HabilidadesTecnicas: string;
    private _HabilidadesSociales: string;
    private _EstudioComplementario: string;
    private _Experencia: string;
    private _categoriaTrabajo: string;
    private _Ocupacion : string;

    constructor( HabilidadesTecnicas: string,  HabilidadesSociales: string, EstudiosComplementario: string, experencia: string, categoriaTrabajo: string,   Ocupacion: string, nombreCompleto: string, email: string, telefono: string, telefono2: string, password: string, descripcion: string, fotoPerfil: string | File | null, municipio: string, tipoDocumento:TipoDocumento, NumeroCedula: Number, genero: TipoGenero, estadoPerfil: EstadoUser,
         tipoUsuario: TipoUsuario, id?: number )  {
        super(nombreCompleto, email, telefono, telefono2,password, descripcion, fotoPerfil, municipio, tipoDocumento, NumeroCedula, genero, estadoPerfil, tipoUsuario, id)
        this._HabilidadesTecnicas = HabilidadesTecnicas;
        this._HabilidadesSociales = HabilidadesSociales;
        this._EstudioComplementario = EstudiosComplementario;
        this._Experencia = experencia;
        this._categoriaTrabajo = categoriaTrabajo;
        this._Ocupacion = Ocupacion;
    }



    get categoriaTrabajo(): string {
        return this._categoriaTrabajo;
    }

    set SetCategoriaTrabajo(value: string){
        this._categoriaTrabajo = value;
    }

    get HabilidadesSociales(): string {
        return this._HabilidadesSociales;
    }

    get HabilidadesTecnicas(): string {
        return this._HabilidadesTecnicas;
    }

    get EstudioComplementario(): string {
        return this._EstudioComplementario;
    }

    get Experiencia(): string {
        return this._Experencia;
    }
    get Ocupacion(): string {
        return this._Ocupacion;
    }

    set HabilidadesSociales(value: string){
        this._HabilidadesSociales = value;
    }

    set HabilidadesTecnicas(value: string){
        this._HabilidadesTecnicas = value;
    }

    set EstudioComplementario(value: string){
        this._EstudioComplementario = value;
    }

    set Experiencia(value: string){
        this._Experencia = value;
    }
    set Ocupacion(value: string){
        this._Ocupacion = value;
    }
}

class InformalDTO extends Usuario {
    constructor(nombreCompleto: string, email: string, telefono: string, telefono2: string, password: string, descripcion: string, fotoPerfil: string | File | null, municipio: string, tipoDocumento:TipoDocumento, NumeroCedula: Number, genero: TipoGenero, estadoPerfil: EstadoUser,
            tipoUsuario: TipoUsuario, id?: number){
        super(nombreCompleto, email, telefono, telefono2, password, descripcion, fotoPerfil, municipio, tipoDocumento, NumeroCedula, genero, estadoPerfil, tipoUsuario, id)
    }  
}



export { ContratanteDTO, ContratistaDTO,  InformalDTO };