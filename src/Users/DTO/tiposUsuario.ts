import { SrvRecord } from "dns";
import Usuario from "../DTO/UserDto";

class ContratanteDTO extends Usuario {
    private _NIT: string;

    constructor(NIT: string, nombreCompleto: string, email: string, telefono: string, password: string, descripcion: string, fotoPerfil: string | File | null, estadoPerfil: "activo" | "inactivo",  tipoUsuario: "Contratante" | "Contratista", id?: number ) {
        super(nombreCompleto, email, telefono, password, descripcion, fotoPerfil, estadoPerfil, tipoUsuario, id)
        this._NIT = NIT;
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
    private _hojaDeVida: string | null;
    private _categoriaTrabajo: string;

    constructor(cedula: string, categoriaTrabajo: string, hojaDeVida: string | null, nombreCompleto: string, email: string, telefono: string, password: string, descripcion: string, fotoPerfil: string | File | null, estadoPerfil: "activo" | "inactivo",  tipoUsuario: "Contratante" | "Contratista", id?: number )  {
        super(nombreCompleto, email, telefono, password, descripcion, fotoPerfil, estadoPerfil, tipoUsuario, id)
        this._cedula = cedula;
        this._hojaDeVida = hojaDeVida;
        this._categoriaTrabajo = categoriaTrabajo;
    }

    get cedula(): string {
        return this._cedula;
    }

    set SetCedula(Value: string){
        this._cedula = Value;
    }

    get hojaDeVida(): string | null {
        return this._hojaDeVida;
    }

    set SetHojaVida(value: string | null){
        this._hojaDeVida = value;
    }

    get categoriaTrabajo(): string {
        return this._categoriaTrabajo;
    }

    set SetCategoriaTrabajo(value: string){
        this._categoriaTrabajo = value;
    }
}




export { ContratanteDTO, ContratistaDTO };
