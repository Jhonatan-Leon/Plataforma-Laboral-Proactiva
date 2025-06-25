class Comentario {
    private _fecha_creacion: Date;
    private _reseña: string;
    private _author_id: Number; 
    private _target_user_id: Number;

    constructor(fecha_creacion: Date, reseña: string, author_id: Number, target_user_id: Number) {
        this._fecha_creacion = fecha_creacion;
        this._reseña = reseña;
        this._author_id = author_id;
        this._target_user_id = target_user_id;
    }

    get fecha_creacion():Date{
        return this._fecha_creacion;
    }

    get reseña():string{
        return this._reseña;
    }

    get author_id():Number{
        return this._author_id;
    }

    get target_user_id():Number{
        return this._target_user_id;
    }

    set fecha_creacion(Value:Date) {
        this._fecha_creacion = Value
    }

    set reseña(Value:string) {
        this._reseña = Value
    }

    set author_id(Value:Number) {
        this._author_id = Value
    }

    set target_user_id(Value:Number) {
        this._target_user_id = Value
    }



}

export default Comentario;