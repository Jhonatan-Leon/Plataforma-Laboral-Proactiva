class RegistrarVacante{

    private _nombre_vacante:string;
    private _descripcion_vacante:string;
    private _estado:string;
    //private _imagenes_vacante:Buffer;
    private _ubicacion_vacante:string;
    private _categoria_trabajo: string;
    //private _fecha_publicacion:Date;

    constructor(
        nombre_vacante: string, 
        descripcion_vacante: string,
        estado: string,
        //imagenes_vacante: Buffer,
        ubicacion_vacante: string,
        categoria_trabajo: string,
        //fecha_publicacion: Date
    ){
        this._nombre_vacante = nombre_vacante;
        this._descripcion_vacante = descripcion_vacante;
        this._estado = estado;
        //this._imagenes_vacante = imagenes_vacante;
        this._ubicacion_vacante = ubicacion_vacante;
        this._categoria_trabajo = categoria_trabajo;
        //this._fecha_publicacion = fecha_publicacion;
    }

    //Getters

    get nombre_vacante(): string{
        return this._nombre_vacante
    }
    get descripcion_vacante(): string{
        return this._descripcion_vacante
    }
    get estado(): string{
        return this._estado
    }
    /*get imagenes_vacante(): Buffer{
        return this._imagenes_vacante
    }*/
    get ubicacion_vacante():string{
        return this._ubicacion_vacante
    }
    get categoria_trabajo():string{
        return this._categoria_trabajo
    }
    /*get fecha_publicacion():Date{
        return this._fecha_publicacion
    }*/

    //Setters

    set nombre_vacante(nombre_vacante:string){
        this._nombre_vacante = nombre_vacante
    }
    set descripcion_vacante(descripcion_vacante:string){
        this._descripcion_vacante = descripcion_vacante
    }
    set estado(estado:string){
        this._estado = estado
    }
    /*set imagenes_vacante(imagenes_vacante:Buffer){
        this._imagenes_vacante = imagenes_vacante
    }*/
    set ubicacion_vacante(ubicacion_vacante:string){
        this._ubicacion_vacante = ubicacion_vacante
    }
    set categoria_trabajo(categoria_trabajo:string){
        this._categoria_trabajo = categoria_trabajo
    }
    /*set fecha_publicacion(fecha_publicacion:Date){
        this._fecha_publicacion = fecha_publicacion
    }*/
}
export default RegistrarVacante