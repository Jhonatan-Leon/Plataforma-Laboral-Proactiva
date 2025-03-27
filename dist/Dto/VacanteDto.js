"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegistrarVacante {
    //private _fecha_publicacion:Date;
    constructor(nombre_vacante, descripcion_vacante, estado, 
    //imagenes_vacante: Buffer,
    ubicacion_vacante, categoria_trabajo) {
        this._nombre_vacante = nombre_vacante;
        this._descripcion_vacante = descripcion_vacante;
        this._estado = estado;
        //this._imagenes_vacante = imagenes_vacante;
        this._ubicacion_vacante = ubicacion_vacante;
        this._categoria_trabajo = categoria_trabajo;
        //this._fecha_publicacion = fecha_publicacion;
    }
    //Getters
    get nombre_vacante() {
        return this._nombre_vacante;
    }
    get descripcion_vacante() {
        return this._descripcion_vacante;
    }
    get estado() {
        return this._estado;
    }
    /*get imagenes_vacante(): Buffer{
        return this._imagenes_vacante
    }*/
    get ubicacion_vacante() {
        return this._ubicacion_vacante;
    }
    get categoria_trabajo() {
        return this._categoria_trabajo;
    }
    /*get fecha_publicacion():Date{
        return this._fecha_publicacion
    }*/
    //Setters
    set nombre_vacante(nombre_vacante) {
        this._nombre_vacante = nombre_vacante;
    }
    set descripcion_vacante(descripcion_vacante) {
        this._descripcion_vacante = descripcion_vacante;
    }
    set estado(estado) {
        this._estado = estado;
    }
    /*set imagenes_vacante(imagenes_vacante:Buffer){
        this._imagenes_vacante = imagenes_vacante
    }*/
    set ubicacion_vacante(ubicacion_vacante) {
        this._ubicacion_vacante = ubicacion_vacante;
    }
    set categoria_trabajo(categoria_trabajo) {
        this._categoria_trabajo = categoria_trabajo;
    }
}
exports.default = RegistrarVacante;
