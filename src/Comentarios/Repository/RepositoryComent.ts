import db from "../../Config/config-db";
import Comentario from "../Dto/ComentarioDto";
import codDto from "../Dto/IdDto";

class ComentarioRepositorio {

    static async add(ComentarioR:Comentario) {
        const sql = 'INSERT INTO comentario (content, author_id, target_user_id, created_at) VALUES ($1,$2,$3,$4)'
        const values = [ComentarioR.reseña,ComentarioR.author_id, ComentarioR.target_user_id, ComentarioR.fecha_creacion];
        return await db.query(sql, values)
    }
    
}

class UpdateComent{
    static async updateComent(Cod_Coment:codDto, comentario:Comentario){
        const sql = 'UPDATE comentario SET created_at=$1, content=$2, author_id=$3, target_user_id=$4 WHERE id_comentario=$5'
        const values = [comentario.fecha_creacion, comentario.reseña, comentario.author_id, comentario.target_user_id, Cod_Coment.id_comentario]
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
            const sql = `SELECT c.id_comentario, u.nombre_completo AS autor_nombre, u.rol AS autor_rol, c.content AS comentario, c.created_at FROM comentario AS c JOIN usuarios AS u ON u.id_usuario = c.author_id WHERE c.target_user_id = $1;`
            const values =[Cod_coment.id_comentario]
            const { rows } = await db.query(sql, values);
            return rows;
        }
}

export {ComentarioRepositorio, UpdateComent, DeleteComent, GetComent} ;