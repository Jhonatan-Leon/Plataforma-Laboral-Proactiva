import Usuario from "./UserDto";

class ContratanteDTO extends Usuario {
    private _NIT: string;
    private _sector: string;

    constructor(NIT: string, nombreCompleto: string, email: string, telefono: string, password: string, descripcion: string, fotoPerfil: string | File | null, municipio: string, tipoDocumento:TipoDocumento, NumeroCedula: Number, genero: TipoGenero, estadoPerfil: EstadoUser,  
        sector: string, tipoUsuario: TipoUsuario, id?: number ) {
        super(nombreCompleto, email, telefono, password, descripcion, fotoPerfil, municipio, tipoDocumento, NumeroCedula, genero, estadoPerfil, tipoUsuario, id)
        this._NIT = NIT;
        this._sector = sector;
    }

    get NIT(): string {
        return this._NIT;
    }

    set NIT(value: String){
        this.NIT = value;
    }
}

class ContratistaDTO extends Usuario {
    private _cedula: string;
    private _HabilidadesTecnicas: string;
    private _HabilidadesSociales: string;
    private _EstudioComplementario: string;
    private _Experencia: string;
    private _categoriaTrabajo: string;

    constructor(cedula: string, HabilidadesTecnicas: string,  HabilidadesSociales: string, EstudiosComplementario: string, experencia: string, categoriaTrabajo: string, nombreCompleto: string, email: string, telefono: string, password: string, descripcion: string, fotoPerfil: string | File | null, municipio: string, tipoDocumento:TipoDocumento, NumeroCedula: Number, genero: TipoGenero, estadoPerfil: EstadoUser,  
        sector: string, tipoUsuario: TipoUsuario, id?: number )  {
        super(nombreCompleto, email, telefono, password, descripcion, fotoPerfil, municipio, tipoDocumento, NumeroCedula, genero, estadoPerfil, tipoUsuario, id)
        this._cedula = cedula;
        this._HabilidadesTecnicas = HabilidadesTecnicas;
        this._HabilidadesSociales = HabilidadesSociales;
        this._EstudioComplementario = EstudiosComplementario;
        this._Experencia = experencia;
        this._categoriaTrabajo = categoriaTrabajo;
    }

    get cedula(): string {
        return this._cedula;
    }

    set SetCedula(Value: string){
        this._cedula = Value;
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
}




export { ContratanteDTO, ContratistaDTO };