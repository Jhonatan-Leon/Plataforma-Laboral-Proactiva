import db from "../../Config/config-db";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
import bcrypt from 'bcryptjs'
import Auth from "../DTO/AuthDTO";

class UserRepository {

    static async addContratanteInformal(User: InformalDTO) {
        const sql = `INSERT INTO usuarios (rol, contraseña, nombre_completo, numero_de_telefono, numero_de_telefono_2, correo_electronico, municipio, genero, foto, descripcion, descripcion, estado_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 $12) RETURNING id_usuario`;
        const values = [ User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.fotoPerfil ?? null, User.estadoPerfil, User.tipoUsuario];
        const result: any = await db.query(sql, values)
        const id = result.rows[0].id_usuario;
        return id;
      }
  
    static async addContratante(User: ContratanteDTO) {
        const sql = `INSERT INTO usuarios (rol, contraseña, nombre_completo, numero_de_telefono, numero_de_telefono_2, correo_electronico, municipio, genero, foto, descripcion, descripcion, estado_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 $12) RETURNING id_usuario`;
        const values = [ User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.fotoPerfil ?? null, User.estadoPerfil, User.tipoUsuario];        
        const result: any = await db.query(sql, values)
        if(result.rowCount > 0){
          try{
            let Id = result.rows[0].id_usuario;
            const sql = `INSERT INTO Contratantes (id_usuario, nit, sector) VALUES ($1, $2, $3)`;
            const values = [Id, User.NIT];
            console.log(values);
            return await db.query(sql, values);
          }catch(err){
            console.log("Error al ingresar usuario contratante ", err)
            throw err;
          }
        } else {
           console.log("No se realizo ningun cambio")
        }
    }

    static async addContratista(User: ContratistaDTO) {
        const sql = `INSERT INTO usuarios (rol, contraseña, nombre_completo, numero_de_telefono, numero_de_telefono_2, correo_electronico, municipio, genero, foto, descripcion, estado_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_usuario`;
        const values = [ User.tipoUsuario, User.password, User.nombreCompleto, User.telefono, User.telefono2 ?? null, User.email, User.municipio, User.genero, User.fotoPerfil ?? null, User.descripcion, User.estadoPerfil];        
        const result: any = await db.query(sql, values)
        console.log(result)
        if(result.rowCount > 0){
          try{
            const Id = result.rows[0].id_usuario;
            const sql = `INSERT INTO Contratista (id_usuario, categoria_trabajo, habilidades_tecnicas, habilidades_sociales, estudio_complementario, experiencia, ocupacion ) VALUES ($1, $2, $3, $4, $5 , $6, $7) RETURNING id_usuario`;
            const values = [Id,  User.categoriaTrabajo, User.HabilidadesTecnicas, User.HabilidadesSociales, User.EstudioComplementario, User.Experiencia, User.categoriaTrabajo];
            const resultId : any = await db.query(sql, values);
            const idUser = resultId.rows[0].id_usuario;
            console.log(idUser)
            return {
              idUser
            }
          }catch(err) {
            console.log("Error al ingresar usuario Contratista", err)
            throw err;
          }
          
        } else {
           console.log("No se realizo ningun cambio")
        }
    }


    static async login(auth: Auth) {
      try {
          const sql = 'SELECT id_usuario, estado_perfil, rol, contraseña FROM usuarios WHERE correo_electronico = $1';
          const values = [auth.email];
          const result: any = await db.query(sql, values);
  
          if (!result || result.rowCount === 0) {
              return { logged: false, status: "Correo o Contraseña incorrectos" };
          }
  
          const user = result.rows[0];
          
          console.log(user)
          if (user.estado_perfil === "inactivo") {
              return { logged: false, status: "Cuenta inactiva. Contacte al soporte." };
          }
        
          const isPasswordValid = await bcrypt.compare(auth.password, user.contraseña);
          if (!isPasswordValid) {
              return { logged: false, status: "Correo o Contraseña incorrectos" };
          }
  
          return { 
              logged: true, 
              status: "Autenticación válida", 
              id: user.id_usuario,  
              estado_perfil: user.estado_perfil,
              rol: user.tipo_usuario
          };
  
      } catch (error) {
          console.error("Error en el login:", error);
          return { logged: false, status: "Error interno del servidor" };
      }
  }
  
  

    static async getUserById(id_usuario: string){
      try {
        const query = `SELECT 
      u.id_usuario,
      u.nombre_completo,
      u.correo_electronico,
      u.numero_de_telefono,
      u.contraseña,
      u.descripcion,
      u.foto,
      u.estado_perfil,
      u.rol,
      c.nit AS contratante_nit,
      c.sector AS contratante_sector,
      t.categoria_trabajo,
      t.habilidades_tecnicas,
      t.habilidades_sociales,
      t.estudio_complementario,
      t.experiencia,
      t.ocupacion
      FROM usuarios u
      LEFT JOIN contratante c ON u.id_usuario = c.id_usuario
      LEFT JOIN contratista t ON u.id_usuario = t.id_usuario
      WHERE u.id_usuario = $1 `;

        const result: any = await db.query(query, [id_usuario]);

        if (result.rowCount === 0) return null;

        let user = result[0];
        console.log(user)

        // Recorrer objeto y eliminar variables con parametros null
        Object.keys(user).forEach((key) =>{
          if(user[key] === null){
            delete user[key]
          }
        })

        return user

    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw error;
    }

    }
    
    static async getByRol(rol: TipoUsuario){
      try {
        const query = `SELECT 
          u.id_usuario,
          u.nombre_completo,
          u.correo_electronico,
          u.numero_de_telefono,
          u.contraseña,
          u.descripcion,
          u.foto,
          u.estado_perfil,
          u.rol,
          c.nit AS contratante_nit,
          c.sector AS contratante_sector,
          t.categoria_trabajo,
          t.habilidades_tecnicas,
          t.habilidades_sociales,
          t.estudio_complementario,
          t.experiencia,
          t.ocupacion
        FROM usuarios u
        LEFT JOIN contratante c ON u.id_usuario = c.id_usuario AND u.rol = 'contratante_formal'
        LEFT JOIN contratista t ON u.id_usuario = t.id_usuario AND u.rol = 'contratista'
        WHERE u.rol = $1;`;
      
        const values = [rol]
      
        console.log(values)

        const result: any = await db.query(query, values);

        if(result.length === 0) return null

        let list = result.rows.map((user: any) => {
          Object.keys(user).forEach((key) => {
            if(user[key] === null){
              delete user[key]
            }
          });

          return user;


        }) ;

        return list;

      }catch (err: any) {
        console.error("Error al obtener al usuario: ", err)
        throw err;
      }
    }

    static async getUserByEmail(correo_electronico: string) {
      try {
          const query = `
                  SELECT 
                u.id_usuario,
                u.nombre_completo,
                u.correo_electronico,
                u.numero_de_telefono,
                u.contraseña,
                u.descripcion,
                u.foto,
                u.estado_perfil,
                u.rol,
                c.nit AS contratante_nit,
                c.sector AS contratante_sector,
                t.categoria_trabajo,
                t.habilidades_tecnicas,
                t.habilidades_sociales,
                t.estudio_complementario,
                t.experiencia,
                t.ocupacion
              FROM usuarios u
              LEFT JOIN contratante c ON u.id_usuario = c.id_usuario
              LEFT JOIN contratista t ON u.id_usuario = t.id_usuario
              WHERE u.correo_electronico = $1`;
                
          const result : any = await db.query(query, [correo_electronico]);
  
          if (result.length === 0) return null;
  
          let user = result[0];
          console.log("Usuario obtenido:", user);
  
          return user;
  
      } catch (error) {
          console.error("Error al obtener el usuario:", error);
          throw error;
      }
  }
  
  /*
  static async updateUser(user: any, email: string){
    try{
      const put = `UPDATE usuarios SET nombre_usuario = COALESCE(?, nombre_usuario), telefono = COALESCE(?, telefono), contraseña = COALESCE(?, constraseña), descripcion_usuario = COALESCE(?, descripcion_usuario),
            foto_perfil = COALESCE(?, foto_perfil), estado_perfil = COALESCE(?, estado_perfil), tipo_usuario = COALESCE(?, tipo_usuario) WHERE email = ?;`;
      const values = [user.nombre_usuario, user.telefono, user.password, user.descripcion_usuario, user.foto_perfil, user.estado_perfil, user.tipo_usuario, email]
       const result : any = await db.query(put, values)
       if (result.rowCount === 0) {
        return { message: "No se realizaron cambios o el usuario no existe." };
      }

      return { message: "Usuario actualizado con éxito", affectedRows: result.rowCount };
    }catch(err: any){
      console.error("Error registro usuarios: ", err)
      throw err;
    }
  }
  */

  static async updateContratante(dataUpdate: ContratanteDTO) {
  try {
    const updateUserQuery = `
      UPDATE usuarios SET
        rol = COALESCE($1, rol),
        contraseña = COALESCE($2, contraseña),
        nombre_completo = COALESCE($3, nombre_completo),
        numero_de_telefono = COALESCE($4, numero_de_telefono),
        correo_electronico = COALESCE($5, correo_electronico),
        foto = COALESCE($6, foto),
        descripcion = COALESCE($7, descripcion),
        estado_perfil = COALESCE($8, estado_perfil)
      WHERE id_usuario = $9;
    `;

    const userValues = [
      dataUpdate.tipoUsuario,
      dataUpdate.password,
      dataUpdate.nombreCompleto,
      dataUpdate.telefono,
      dataUpdate.email,
      dataUpdate.fotoPerfil,
      dataUpdate.descripcion,
      dataUpdate.estadoPerfil,
      dataUpdate.id
    ];

    const userResult = await db.query(updateUserQuery, userValues);

    if (userResult.rowCount === 0) {
      return { message: 'No se logró actualizar el usuario' };
    }

    const updateContratanteQuery = `
      UPDATE contratante SET
        nit = COALESCE($1, nit),
        sector = COALESCE($2, sector)
      WHERE id_usuario = $3;
    `;

    const contratanteValues = [dataUpdate.NIT, dataUpdate.sector, dataUpdate.id];
    const contratanteResult = await db.query(updateContratanteQuery, contratanteValues);

    return {
      message: "Usuario actualizado exitosamente",
      result: { userUpdate: userResult.rowCount, contratanteUpdate: contratanteResult.rowCount }
    };
  } catch (err: any) {
    console.error("Error al actualizar datos:", err);
    throw err;
  }
}


  static async updateContratista(dataUpdate: ContratistaDTO) {
  try {
    // Primero: actualizar los campos de la tabla usuarios
    const updateUserQuery = `
      UPDATE usuarios SET
        rol = COALESCE($1, rol),
        contraseña = COALESCE($2, contraseña),
        nombre_completo = COALESCE($3, nombre_completo),
        numero_de_telefono = COALESCE($4, numero_de_telefono),
        correo_electronico = COALESCE($5, correo_electronico),
        foto = COALESCE($6, foto),
        descripcion = COALESCE($7, descripcion),
        estado_perfil = COALESCE($8, estado_perfil)
      WHERE id_usuario = $9;
    `;

    const userValues = [
      dataUpdate.tipoUsuario,
      dataUpdate.password,
      dataUpdate.nombreCompleto,
      dataUpdate.telefono,
      dataUpdate.email,
      dataUpdate.fotoPerfil,
      dataUpdate.descripcion,
      dataUpdate.estadoPerfil,
      dataUpdate.id
    ];

    const userResult = await db.query(updateUserQuery, userValues);
    if (userResult.rowCount === 0) {
      return { message: 'No se encontró el usuario para actualizar.' };
    }

    // Segundo: actualizar los campos de la tabla contratista
    const updateContratistaQuery = `
      UPDATE contratista SET
        categoria_trabajo = COALESCE($1, categoria_trabajo),
        habilidades_tecnicas = COALESCE($2, habilidades_tecnicas),
        habilidades_sociales = COALESCE($3, habilidades_sociales),
        estudio_complementario = COALESCE($4, estudio_complementario),
        experiencia = COALESCE($5, experiencia),
        ocupacion = COALESCE($6, ocupacion)
      WHERE id_usuario = $7;
    `;

    const contratistaValues = [
      dataUpdate.categoriaTrabajo,
      dataUpdate.HabilidadesTecnicas,
      dataUpdate.HabilidadesSociales,
      dataUpdate.EstudioComplementario,
      dataUpdate.Experiencia,
      dataUpdate.Ocupacion,
      dataUpdate.id
    ];

    const contratistaResult = await db.query(updateContratistaQuery, contratistaValues);

    return {
      message: 'Usuario contratista actualizado correctamente',
      result: {
        usuario: userResult.rowCount,
        contratista: contratistaResult.rowCount
      }
    };
  } catch (err) {
    console.error('Error al actualizar usuario contratista:', err);
    throw err;
  }
}


  static async updateInformal(user: InformalDTO){
    try {
      const put = `UPDATE usuarios SET nombre_usuario = COALESCE(?, nombre_usuario), telefono = COALESCE(?, telefono), contraseña = COALESCE(?, constraseña), descripcion_usuario = COALESCE(?, descripcion_usuario),
            foto_perfil = COALESCE(?, foto_perfil), estado_perfil = COALESCE(?, estado_perfil), tipo_usuario = COALESCE(?, tipo_usuario) WHERE email = ?;`;
      const values = [user.nombreCompleto, user.telefono, user.telefono2, user.NumeroCedula, user.tipoDocumento, user.genero,  user.descripcion, user.fotoPerfil, user.estadoPerfil, user.tipoUsuario, user.email]
       const result : any = await db.query(put, values)
       if (result.rowCount === 0) {
        return { message: "No se realizaron cambios o el usuario no existe." };
      }

      return { message: "Usuario actualizado con éxito", affectedRows: result.rowCount };
    }catch(err: any){
      console.error("Error registro usuarios: ", err)
      throw err;
    }
  }

  static async deleteUser(email: string){
    const userdelete = `DELETE FROM usuarios WHERE correo_electronico = $1`;
    const values = [email];

    return await db.query(userdelete, values);
  }

  // Proximo integración con coockies
  static async deleUser(id: Number){
    const userDelete = `Delete From usuarios where id_usuario = $1`;
    const values = [id];

    return await db.query(userDelete, values)
  }

  static async desactivarUser(idUser: string){
    const userdesactivar = `UPDATE usuarios SET estado_perfil = 'inactivo' WHERE id_usuario = $1 AND estado_perfil != 'inactivo'`;
    const values = [idUser]

    const result :any = await db.query(userdesactivar, values);

    return result.rowCount > 0
  }

}

export default UserRepository;