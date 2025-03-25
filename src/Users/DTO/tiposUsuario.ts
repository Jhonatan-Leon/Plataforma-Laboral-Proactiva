import Usuario from "./UserDto";

class ContratanteDTO extends Usuario {
    private NIT: String;

    constructor(data: Omit<ContratanteDTO, "id">, NIT: String) {
        super(
            data.email,
            data.telefono,
            data.nombreCompleto,
            data.password,
            0,
            data.descripcion,
            data.fotoPerfil ?? undefined,
            data.estadoPerfil ?? undefined
        );
        this.NIT = NIT;
    }
}

class ContratistaDTO extends Usuario {
    private hojaDeVida: String;
    private categoriaTrabajo: String;

    constructor(data: Omit<ContratistaDTO, "id">, hojaDevida: String, categoriaTrabajo: String) {
        super(
            data.email,
            data.telefono,
            data.nombreCompleto,
            data.password,
            0, 
            data.descripcion,
            data.fotoPerfil ?? undefined,
            data.estadoPerfil ?? undefined
        );
        this.hojaDeVida = hojaDevida;
        this.categoriaTrabajo = categoriaTrabajo;
    }
}

export { ContratanteDTO, ContratistaDTO };
