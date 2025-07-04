import db from "../../Config/config-db";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
import bcrypt from 'bcryptjs'
import Auth from "../DTO/AuthDTO";

class UserRepository {

    static async addContratanteInformal(User: InformalDTO) {
        const sql = `INSERT INTO usuarios (rol, contraseña, nombre_completo, numero_de_telefono, numero_de_telefono_2, correo_electronico, municipio, genero, foto, descripcion, estado_perfil, tipo_documento, documento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id_usuario`;
        const values = [ User.tipoUsuario, User.password, User.nombreCompleto, User.telefono, User.telefono2 ?? null, User.email, User.municipio, User.genero, User.fotoPerfil ?? null, User.descripcion, User.estadoPerfil, User.tipoDocumento, User.NumeroCedula];
        const result: any = await db.query(sql, values)
        const id = result.rows[0].id_usuario;
        return id;
      }
  
    static async addContratante(User: ContratanteDTO) {
        const sql = `INSERT INTO usuarios (rol, contraseña, nombre_completo, numero_de_telefono, numero_de_telefono_2, correo_electronico, municipio, genero, foto, descripcion, estado_perfil, tipo_documento, documento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id_usuario`;
        const values = [ User.tipoUsuario, User.password, User.nombreCompleto, User.telefono, User.telefono2 ?? null, User.email, User.municipio, User.genero, User.fotoPerfil ?? null, User.descripcion, User.estadoPerfil, User.tipoDocumento, User.NumeroCedula];        
        const result: any = await db.query(sql, values)
        if(result.rowCount > 0){
          try{
            let Id = result.rows[0].id_usuario;
            const sql = `INSERT INTO contratante (id_usuario, nit, sector) VALUES ($1, $2, $3)`;
            const values = [Id, User.NIT, User.sector];
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
        const sql = `INSERT INTO usuarios (rol, contraseña, nombre_completo, numero_de_telefono, numero_de_telefono_2, correo_electronico, municipio, genero, foto, descripcion, estado_perfil, tipo_documento, documento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id_usuario`;
        const values = [ User.tipoUsuario, User.password, User.nombreCompleto, User.telefono, User.telefono2 ?? null, User.email, User.municipio, User.genero, User.fotoPerfil ?? null, User.descripcion, User.estadoPerfil, User.tipoDocumento, User.NumeroCedula];        
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
          const sql = 'SELECT id_usuario, estado_perfil, rol, contraseña FROM usuarios WHERE correo_electronico = $1  or numero_de_telefono = $1';
          const values = [auth.emailorPhone];
          const result: any = await db.query(sql, values);
  
          if (!result || result.rowCount === 0) {
              return { logged: false, status: "Usuario no registrado", httpCode: 404 };
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
              rol: user.rol
          };
  
      } catch (error) {
          console.error("Error en el login:", error);
          return { logged: false, status: "Error interno del servidor" };
      }
  }
  
  static async loginWithGoogle(email: string) {
      try {
          const sql = 'SELECT id_usuario, estado_perfil, rol FROM usuarios WHERE correo_electronico = $1';
          const values = [email];
          const result: any = await db.query(sql, values);

          if (!result || result.rowCount === 0) {
              return { logged: false, status: "Usuario no registrado", httpCode: 404 };
          }

          const user = result.rows[0];

          if (user.estado_perfil === "inactivo") {
              return { logged: false, status: "Cuenta inactiva. Contacte al soporte." };
          }

          return {
              logged: true,
              status: "Autenticación válida",
              id: user.id_usuario,
              estado_perfil: user.estado_perfil,
              rol: user.rol
          };

      } catch (error) {
          console.error("Error en el login con Google:", error);
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
      u.numero_de_telefono_2,
      u.contraseña,
      u.descripcion,
      u.foto,
      u.municipio,
      u.notificaciones,
      u.estado_perfil,
      u.rol,
      u.tipo_documento,
      u.documento,
      u.genero,
      c.nit AS contratante_nit,
      c.sector AS contratante_sector,
      t.categoria_trabajo,
      t.habilidades_tecnicas,
      t.habilidades_sociales,       
      t.estudio_complementario,
      t.ocupacion
      FROM usuarios u
      LEFT JOIN contratante c ON u.id_usuario = c.id_usuario
      LEFT JOIN contratista t ON u.id_usuario = t.id_usuario
      WHERE u.id_usuario = $1 `;

        const result: any = await db.query(query, [id_usuario]);

        if (!result.rows || result.rows.length === 0) return null;

        let user = result.rows[0];
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
    
  static async getByRol(rol: string){
      try {
        const query = `SELECT 
          u.id_usuario,
          u.nombre_completo,
          u.correo_electronico,
          u.numero_de_telefono,
          u.contraseña,
          u.descripcion,
          u.foto,
          u.municipio,
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
      

        const result: any = await db.query(query, values);

        if (!result.rows || result.rows.length === 0) return null;

        // Limpieza de cada usuario (eliminar claves con valor null)
        const cleanedUsers = result.rows.map((user: any) => {
        const cleaned: any = {};
        for (const [key, value] of Object.entries(user)) {
          if (value !== null && key !== 'contraseña') {
          cleaned[key] = value === '[object Object]' ? '' : value;
          }
        }
        return cleaned;
      });

      return cleanedUsers;

      } catch (err) {
        console.log("Error al obtener usuarios: ", err);
      }
    }


    static async getUser(){
      try {
          const sql = `SELECT u.id_usuario, u.nombre_completo, u.correo_electronico, u.numero_de_telefono,
          u.contraseña, u.descripcion, u.foto, u.estado_perfil, u.rol, 
          c.nit AS contratante_nit, c.sector AS contratante_sector, 
          t.categoria_trabajo, t.habilidades_tecnicas, t.habilidades_sociales,
          t.estudio_complementario, t.experiencia, t.ocupacion 
          FROM usuarios u 
          LEFT JOIN contratante c ON u.id_usuario = c.id_usuario 
          LEFT JOIN contratista t ON u.id_usuario = t.id_usuario;`

        const result: any = await db.query(sql);
        if (!result.rows || result.rows.length === 0) return null;

        // Limpieza de cada usuario (eliminar claves con valor null)
        const cleanedUsers = result.rows.map((user: any) => {
        const cleaned: any = {};
        for (const [key, value] of Object.entries(user)) {
          if (value !== null && key !== 'contraseña') {
          cleaned[key] = value === '[object Object]' ? '' : value;
          }
        }
        return cleaned;
      });

      return cleanedUsers;

      } catch (err) {
        console.log("Error al obtener usuarios: ", err);
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
      UPDATE usuarios SET rol = COALESCE($1, rol), contraseña = COALESCE($2, contraseña), nombre_completo = COALESCE($3, nombre_completo), numero_de_telefono = COALESCE($4, numero_de_telefono), numero_de_telefono_2 = COALESCE($5, numero_de_telefono_2),
       correo_electronico = COALESCE($6, correo_electronico), foto = COALESCE($7, foto), descripcion = COALESCE($8, descripcion), estado_perfil = COALESCE($9, estado_perfil) WHERE id_usuario = $10 `;

    const values = [dataUpdate.tipoUsuario, dataUpdate.password, dataUpdate.nombreCompleto, dataUpdate.telefono, dataUpdate.telefono2 ?? null, dataUpdate.email, dataUpdate.fotoPerfil ?? null, dataUpdate.descripcion, dataUpdate.estadoPerfil, dataUpdate.id]


    const userResult = await db.query(updateUserQuery, values);

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
      UPDATE usuarios SET rol = COALESCE($1, rol), contraseña = COALESCE($2, contraseña), nombre_completo = COALESCE($3, nombre_completo), numero_de_telefono = COALESCE($4, numero_de_telefono), numero_de_telefono_2 = COALESCE($5, numero_de_telefono_2),
       correo_electronico = COALESCE($6, correo_electronico), foto = COALESCE($7, foto), descripcion = COALESCE($8, descripcion), estado_perfil = COALESCE($9, estado_perfil) WHERE id_usuario = $10`;
    const values = [dataUpdate.tipoUsuario, dataUpdate.password, dataUpdate.nombreCompleto, dataUpdate.telefono, dataUpdate.telefono2 ?? null, dataUpdate.email, dataUpdate.fotoPerfil ?? null, dataUpdate.descripcion, dataUpdate.estadoPerfil, dataUpdate.id]


    const userResult = await db.query(updateUserQuery, values);
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
      console.log("DTO recibido:", user);


      const put =  `UPDATE usuarios SET rol = COALESCE($1, rol), contraseña = COALESCE($2, contraseña), nombre_completo = COALESCE($3, nombre_completo), numero_de_telefono = COALESCE($4, numero_de_telefono), numero_de_telefono_2 = COALESCE($5, numero_de_telefono_2),
       correo_electronico = COALESCE($6, correo_electronico), foto = COALESCE($7, foto), descripcion = COALESCE($8, descripcion), estado_perfil = COALESCE($9, estado_perfil) WHERE id_usuario = $10`;
      const values = [user.tipoUsuario, user.password, user.nombreCompleto, user.telefono, user.telefono2 ?? null, user.email, user.fotoPerfil ?? null, user.descripcion, user.estadoPerfil, user.id]
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

  static async deleteUser(id: string){
    const userdelete = `DELETE FROM usuarios WHERE id_usuario = $1`;
    const values = [id];
    const result: any = await db.query(userdelete, values);
    if (result.rowCount === 0) {
      return { message: "No se encontraron usuarios para eliminar." };
    }
    return { message: "Usuario eliminado con éxito", affectedRows: result.rowCount };
  }

  // Proximo integración con coockies
  static async deleUser(id: Number){
    const userDelete = `Delete From usuarios where id_usuario = $1`;
    const values = [id];

    return await db.query(userDelete, values)
  }

  static async desactivarUser(idUser: string): Promise<boolean> {
    const userdesactivar = `UPDATE usuarios SET estado_perfil = 'inactivo' WHERE id_usuario = $1 AND estado_perfil != 'inactivo'`;

    const {rowCount }   = await db.query(userdesactivar, [idUser]);

    return (rowCount ?? 0 ) > 0
  }

  static async changePassword(userId: string,  newPassword: string) {
    try {
      const sql = `UPDATE usuarios SET contraseña = $1 WHERE id_usuario = $2`;
      const values = [newPassword, userId];
      await db.query(sql, values);
    }catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      throw error;
    } 
  }
}

export default UserRepository;