class codDto{

    private _cod_vacante: number;

    constructor(cod_vacante:number){
        this._cod_vacante= cod_vacante;
    }

    //getter
    get cod_vacante(): number {
        return this._cod_vacante;
    }
    //setter
    set cod_vacante(cod_vacante:number){
        this._cod_vacante = cod_vacante;
    }
}
class categoriaDto{
    private _categoria_trabajo: string;

    constructor(categoria_trabajo:string){
        this._categoria_trabajo = categoria_trabajo;
    }

    //  Getter
    get categoria_trabajo(): string {
        return this._categoria_trabajo;
    }
    //  Setter
    set categoria_trabajo(categoria_trabajo: string) {
        this._categoria_trabajo = categoria_trabajo;
    }
}
export {codDto, categoriaDto};