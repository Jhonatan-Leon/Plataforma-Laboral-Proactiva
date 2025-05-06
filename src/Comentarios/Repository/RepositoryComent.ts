import db from "../config/config-db";
import Comentario from "../Dto/ComentarioDto";
import codDto from "../Dto/IdDto";

class ComentarioRepositorio {

    static async add(ComentarioR:Comentario) {
        const sql = 'INSERT INTO comentario (fecha_calificacion, reseña, calificacion) VALUES ($1,$2,$3)'
        const values = [ComentarioR.fecha_calificacion,ComentarioR.reseña,ComentarioR.calificacion];
        return await db.query(sql, values)
    }
    
}

class UpdateComent{
    static async updateComent(Cod_Coment:codDto, comentario:Comentario){
        const sql = 'UPDATE comentario SET fecha_calificacion=$1, reseña=$2, calificacion=$3 WHERE id_comentario=$4'
        const values = [comentario.fecha_calificacion, comentario.reseña, comentario.calificacion, Cod_Coment.id_comentario]
        console.log(sql, values);
        return db.query(sql,values)
    }
}

class DeleteComent{
    static async deleteComent(Cod_coment:codDto){
        const sql = 'DELETE FROM comentario WHERE id_comentario=$1'
        const values =[Cod_coment.id_comentario]
        console.log(sql, values);
        return db.query(sql,values)
    }
}

    class GetComent{
        static async getComent(Cod_coment:codDto){
            const sql = 'SELECT * FROM comentario WHERE id_comentario=$1'
            const values =[Cod_coment.id_comentario]
            console.log(sql, values);
            return db.query(sql,values)
        }
}

export {ComentarioRepositorio, UpdateComent, DeleteComent, GetComent} ;