class TextoDto{
    private _texto: string;

    constructor(texto:string){
        this._texto =texto;
    }


    //Getters
    get texto():string{
        return this._texto
    }
    //Setters
    set texto(Value:string){
        this._texto= Value
    }
}
export default TextoDto;