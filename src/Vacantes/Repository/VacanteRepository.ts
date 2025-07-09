import db from "../../Config/config-db"
import VacanteDto from "../Dto/VacanteDto";
import  { categoriaDto, codDto } from "../Dto/ConsultaDto"
import { setDefaultAutoSelectFamily } from "net";

class VacanteRepository{
    static async AddVacante(vacante: VacanteDto){
        const sql = 'INSERT INTO vacante (id_usuario, tipo_vacante, nombre_vacante, persona_de_contacto, numero_de_telefono, correo_electronico, direccion, descripcion, logo, salario_estimado,  disponibilidad) VALUES ($1,$2,$3,$4,$5, $6,$7,$8,$9,$10,$11)'
        
        const values = [vacante.id_usuario, vacante.categoria_trabajo, vacante.nombre_vacante, vacante.persona_contacto, vacante.numero_contacto, vacante.correo_electronico, vacante.direccion, vacante.descripcion_vacante, vacante.logo, vacante.salario_vacante, vacante.disponibilidad]
        const result : any = await db.query(sql, values);
        if (result.rowCount > 0) {
            return { message: "Vacante registrada exitosamente" };
        } else {
            throw new Error("Error al registrar la vacante");
        }
    }

    static async buscar(cod_vacante:codDto){
        
        const sql = 'SELECT * FROM vacante WHERE cod_vacante=$1'
        const values =[cod_vacante.cod_vacante]
        console.log(sql, values);
        return db.query(sql,values)
        
    }

    static async buscarByCategory(categoria_trabajo:categoriaDto){
        
        const sql = 'SELECT * FROM vacante WHERE categoria_trabajo=$1'
        const values =[categoria_trabajo.categoria_trabajo]
        console.log(sql, values);
        return db.query(sql,values)
        
    }

    static async ObtenerTodosVacantes() {
        const sql = 'SELECT v.*, u.nombre_completo,c.sector, u.municipio,u.descripcion AS descripcion_usuario, u.rol FROM vacante v JOIN usuarios u ON v.id_usuario = u.id_usuario JOIN contratante c ON u.id_usuario = c.id_usuario;';
        try {
            const result = await db.query(sql);
            return result.rows; // devuelve solo los datos
        } catch (error) {
            console.error('Error al obtener todas las vacantes:', error);
            throw error;
        }
}

    
    static async updateVacante(cod_vacante: Number, vacante: VacanteDto) {
        const sql = `UPDATE vacante SET tipo_vacante = $1, nombre_vacante = $2, persona_de_contacto = $3, numero_de_telefono = $4, correo_electronico = $5, direccion = $6, descripcion = $7, 
        logo = $8, salario_estimado = $9, disponibilidad = $10 where cod_vacante = $11 returning *;`;

        const values = [vacante.categoria_trabajo, vacante.nombre_vacante, vacante.persona_contacto, vacante.numero_contacto, vacante.correo_electronico, vacante.direccion, vacante.descripcion_vacante,
            vacante.logo, vacante.salario_vacante, vacante.disponibilidad, cod_vacante
        ];
        const result = await db.query(sql,values)
        return result.rows[0]
    }
    
   
    static async deleteVacante(cod_vacante:codDto){
        const sql = 'DELETE FROM vacante WHERE cod_vacante=$1'
        const values =[cod_vacante.cod_vacante]
        console.log(sql, values);
        return db.query(sql,values)
    }

    static async obtenerVacanteByUser(id: string){
        const sql = 'SELECT * From vacante where id_usuario = $1'
        const values = [id]
        const result  = await db.query(sql, values)
        return result.rows
    }
}

export default VacanteRepository;