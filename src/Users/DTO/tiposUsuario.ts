import Usuario from "../DTO/UserDto";

class ContratanteDTO {
    private _usuarioId: number;
    private _NIT: string;

    constructor(usuarioId: number, NIT: string) {
        this._usuarioId = usuarioId;
        this._NIT = NIT;
    }

    get usuarioId(): number {
        return this._usuarioId;
    }

    get NIT(): string {
        return this._NIT;
    }
}

class ContratistaDTO {
    private _usuarioId: number;
    private _cedula: string;
    private _hojaDeVida: string | null;
    private _categoriaTrabajo: string;

    constructor(usuarioId: number, cedula: string, categoriaTrabajo: string, hojaDeVida: string | null) {
        this._usuarioId = usuarioId;
        this._cedula = cedula;
        this._hojaDeVida = hojaDeVida;
        this._categoriaTrabajo = categoriaTrabajo;
    }

    get usuarioId(): number {
        return this._usuarioId;
    }

    get cedula(): string {
        return this._cedula;
    }

    get hojaDeVida(): string | null {
        return this._hojaDeVida;
    }

    get categoriaTrabajo(): string {
        return this._categoriaTrabajo;
    }
}




export { ContratanteDTO, ContratistaDTO };
