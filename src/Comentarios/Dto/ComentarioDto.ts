class Comentario {
    private _fecha_calificacion: Date;
    private _reseña: string;
    private _calificacion: Number; 

    constructor(fecha_calificacion: Date, reseña: string, calificacion: Number) {
            this._fecha_calificacion = fecha_calificacion;
            this._reseña = reseña;
            this._calificacion = calificacion;
    }

    get fecha_calificacion():Date{
        return this._fecha_calificacion;
    }

    get reseña():string{
        return this._reseña;
    }

    get calificacion():Number{
        return this._calificacion;
    }

    set fecha_calificacion(Value:Date) {
        this._fecha_calificacion = Value
    }

    set reseña(Value:string) {
        this._reseña = Value
    }

    set calificacion(Value:Number) {
        this._calificacion = Value
    }



}

export default Comentario;