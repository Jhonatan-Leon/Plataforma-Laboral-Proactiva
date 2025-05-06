import { query } from "express";
import db from "../Config/config-db"
import VacanteDto from "../Dto/VacanteDto";
import  { categoriaDto, codDto } from "../Dto/ConsultaDto"

class VacanteRepository{
    static async AddVacante(RegisterVacante:VacanteDto){
        const sql = 'INSERT INTO vacante (nombre_vacante, descripcion_vacante, estado, ubicacion_vacante, categoria_trabajo) VALUES ($1,$2,$3,$4,$5)'
        const values = [RegisterVacante.nombre_vacante, RegisterVacante.descripcion_vacante, RegisterVacante.estado, RegisterVacante.ubicacion_vacante, RegisterVacante.categoria_trabajo]
       
        console.log(sql, values);
        
        return db.query(sql,values)
    }
}


class BrowseRepository{
    static async buscar(cod_vacante:codDto){
        
        const sql = 'SELECT * FROM vacante WHERE cod_vacante=$1'
        const values =[cod_vacante.cod_vacante]
        console.log(sql, values);
        return db.query(sql,values)
        
    }
}
class BrowseRepository2{
    static async buscar(categoria_trabajo:categoriaDto){
        
        const sql = 'SELECT * FROM vacante WHERE categoria_trabajo=$1'
        const values =[categoria_trabajo.categoria_trabajo]
        console.log(sql, values);
        return db.query(sql,values)
        
    }
}


class UpdateRepository{
    static async updateVacante(cod_vacante:codDto, vacante:VacanteDto){
        const sql = 'UPDATE vacante SET nombre_vacante=$1, descripcion_vacante=$2, estado=$3, ubicacion_vacante=$4, categoria_trabajo=$5  WHERE cod_vacante=$6'
        const values = [vacante.nombre_vacante, vacante.descripcion_vacante, vacante.estado, vacante.ubicacion_vacante,vacante.categoria_trabajo, cod_vacante.cod_vacante]
        console.log(sql, values);
        return db.query(sql,values)
    }

}
class DeleteRepository{
    static async deleteVacante(cod_vacante:codDto){
        const sql = 'DELETE FROM vacante WHERE cod_vacante=$1'
        const values =[cod_vacante.cod_vacante]
        console.log(sql, values);
        return db.query(sql,values)
    }
}
export {
    VacanteRepository, BrowseRepository, UpdateRepository,DeleteRepository, BrowseRepository2
} 