import db from "../../Config/config-db";
import postulacion from "../DTO/DtoPostulacion";


class PostulacionRepository {
	static async registrarPost(data: postulacion) {
    const sql = `INSERT INTO postulacion (id_usuario, cod_vacante, estado, fecha_postulacion, comentario)VALUES ($1, $2, $3, $4, $5);`;
	  const values = [data.idUsuario, data.codVacacnte, data.estado, data.fechaPostulacion, data.comentario ?? null];

    return db.query(sql, values); 
  }

  static async GetPostulacion(id: string){
    const sql = ` SELECT  v.*, emp.nombre_completo AS nombre_empresa, c.sector, emp.municipio, emp.descripcion AS descripcion_contratante, p.id_postulacion, p.id_usuario, p.estado, p.fecha_postulacion 
            FROM postulacion p JOIN vacante v ON v.cod_vacante = p.cod_vacante JOIN usuarios emp ON emp.id_usuario = v.id_usuario LEFT JOIN contratante c ON c.id_usuario = emp.id_usuario WHERE p.id_usuario = $1 ORDER BY p.fecha_postulacion DESC;`;
    const { rows } = await db.query(sql, [id]);
    return rows;
  }

  static async findByIdAndUser(idPost: string, userId: string){
    const sql = `SELECT 1 FROM postulacion WHERE id_postulacion = $1 AND id_usuario = $2`
    const values = [idPost, userId]
    const {rows} = await db.query(sql, values)
    return rows.length > 0;

  }

  static async deleteById(idPost: string){
    const sql = `DELETE FROM postulacion WHERE id_postulacion = $1`
    const values = [idPost]
    const { rowCount } = await db.query(sql, values)
    return rowCount;
  }

  static async findByVacanteAndCreator(creatorId: string){
    const sql = `SELECT
                /* ------- datos de la postulación ------- */
                p.id_postulacion,
                p.cod_vacante,
                p.estado,
                p.fecha_postulacion,

                /* ------- datos básicos del contratista ------- */
                u.id_usuario,
                u.nombre_completo,
                u.correo_electronico,
                u.numero_de_telefono,
                u.numero_de_telefono_2,
                u.tipo_documento,
                u.documento,
                u.municipio,

                /* ------- datos técnicos desde la tabla contratista ------- */
                c.habilidades_tecnicas,
                c.estudio_complementario,
                c.categoria_trabajo,
                c.ocupacion,

                /* título de la vacante */
                v.nombre_vacante,

                /* ------- comentarios agregados en un array JSON ------- */
                COALESCE(
                  (
                    SELECT json_agg(
                      json_build_object(
                        'id',       cmt.id_comentario,
                        'name', au.nombre_completo,
                        'text',     cmt.content,
                        'date',      cmt.created_at::date
                      ) ORDER BY cmt.created_at DESC
                    )
                    FROM comentario cmt
                    JOIN usuarios au ON au.id_usuario = cmt.author_id 
                    WHERE cmt.target_user_id = u.id_usuario
                  ),
                  '[]'::json
                ) AS comments

              FROM postulacion p
              JOIN vacante     v ON v.cod_vacante = p.cod_vacante
              JOIN usuarios    u ON u.id_usuario  = p.id_usuario
              LEFT JOIN contratista c ON c.id_usuario = u.id_usuario  
              WHERE v.id_usuario = $1 AND p.estado IN ('aceptada', 'pendiente')
              ORDER BY p.fecha_postulacion DESC;`
    
    const values = [creatorId]

    const {rows} = await db.query(sql, values)
    console.log(rows)
    return rows
  }

  static async updatePostulacionStatus (id: string, estado: string){
    const sql = `UPDATE postulacion SET estado = $2, fecha_postulacion = NOW() WHERE id_postulacion = $1  RETURNING id_postulacion; `;
    const values = [id, estado]
    const { rows } = await db.query(sql, values)

    return rows.length > 0;
  }
}

export default PostulacionRepository;