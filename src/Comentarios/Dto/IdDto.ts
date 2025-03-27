class codDto{

    private _id_comentario: number;

    constructor(id_comentario:number){
        this._id_comentario= id_comentario;
    }

    //getter
    get id_comentario(): number {
        return this._id_comentario;
    }
    //setter
    set id_comentario(id_comentario:number){
        this._id_comentario = id_comentario;
    }
}

export default codDto;