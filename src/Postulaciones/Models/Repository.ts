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
}

export default PostulacionRepository;