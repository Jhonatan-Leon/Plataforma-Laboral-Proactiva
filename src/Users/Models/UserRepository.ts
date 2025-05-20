import db from "../../Config/config-db";
import { ContratanteDTO, ContratistaDTO } from "../DTO/TipoUser";
import bcrypt from 'bcryptjs'
import Auth from "../DTO/AuthDTO";

class UserRepository {

  
    static async addContratante(User: ContratanteDTO) {
        const sql = `INSERT INTO usuarios (nombre_usuario, email, telefono, contraseña, descripcion_usuario, foto_perfil, estado_perfil, tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_usuario`;
        const values = [ User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.fotoPerfil ?? null, User.estadoPerfil, User.tipoUsuario];        
        const result: any = await db.query(sql, values)
        if(result.rowCount > 0){
          try{
            let Id = result.rows[0].id_usuario;
            const sql = `INSERT INTO Contratantes (id_usuario, NIT) VALUES (?, ?)`;
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
        const sql = `INSERT INTO usuarios (nombre_usuario, email, telefono, contraseña, descripcion_usuario, foto_perfil, estado_perfil, tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_usuario`;
        const values = [ User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.fotoPerfil ?? null, User.estadoPerfil, User.tipoUsuario];        
        const result: any = await db.query(sql, values)
        console.log(result)
        if(result.rowCount > 0){
          try{
            const Id = result.rows[0].id_usuario;
            const sql = `INSERT INTO Contratista (id_usuario, cedula, categoria_trabajo, hoja_vida) VALUES ($1, $2, $3, $4) RETURNING id_usuario`;
            const values = [Id, User.cedula, User.categoriaTrabajo];
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
  
  

    static async getUserById(Id: string){
      try {
        const query = `SELECT u.id_usuario, u.nombre_usuario, u.email, u.telefono, u.password, u.descripcion_usuario, u.foto_perfil, u.estado_perfil, u.rol, c.NIT AS contratante_NIT, t.cedula AS contratista_cedula, t.categoria_trabajo, t.hoja_vida FROM usuarios u
        LEFT JOIN contratantes c ON u.id_usuario = c.id_contratante AND u.tipo_usuario = 'contratante' LEFT JOIN contratistas t ON u.id_usuario = t.id_contratista AND u.tipo_usuario = 'contratista' WHERE u.id_usuario = $1`;

        const result: any = await db.query(query, [Id]);

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
    
    static async getByRol(tipo_usuario: "Contratista" | "Contratante"){
      try {
        const query = `SELECT u.id_usuario, u.nombre_usuario, u.email, u.telefono, u.contraseña, u.descripcion_usuario, u.foto_perfil, u.estado_perfil, u.tipo_usuario, c.nit AS contratante_nit, t.cedula AS contratista_cedula, t.categoria_trabajo, t.hoja_vida FROM usuarios u
        LEFT JOIN contratante c ON u.id_usuario = c.id_usuario AND u.tipo_usuario = 'contratante' LEFT JOIN contratista t 
        ON u.id_usuario = t.id_usuario AND u.tipo_usuario = 'contratista' WHERE u.tipo_usuario = $1;`;
      
        const values = [tipo_usuario]
      
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

    static async getUserByEmail(email: string) {
      try {
          const query = `
              SELECT u.id_usuario, u.nombre_usuario, u.email, u.telefono, u.password, u.descripcion_usuario, u.foto_perfil, u.estado_perfil, u.tipo_usuario, c.NIT AS contratante_NIT, 
                t.cedula AS contratista_cedula, t.categoria_trabajo, t.hoja_vida FROM usuarios u LEFT JOIN contratantes c ON u.id_usuario = c.id_contratante LEFT JOIN contratistas t ON u.id_usuario = t.id_contratista
                WHERE u.email = ?;`;
  
          const result : any = await db.query(query, [email]);
  
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

  static async updateContratante(dataUpdate: ContratanteDTO){
    try{
      const updateUserQuery = `UPDATE usuarios SET nombre_usuario = COALESCE($1, nombre_usuario), telefono = COALESCE($2, telefono), contraseña = COALESCE($3, contraseña), descripcion_usuario = COALESCE($4, descripcion_usuario), foto_perfil = COALESCE($5, foto_perfil), estado_perfil = COALESCE($6, estado_perfil), tipo_usuario = COALESCE($7, tipo_usuario) WHERE id_usuario = $8;`;

      const userValues = [dataUpdate.nombreCompleto, dataUpdate.telefono, dataUpdate.password, dataUpdate.descripcion, dataUpdate.fotoPerfil, dataUpdate.estadoPerfil, dataUpdate.tipoUsuario, dataUpdate.email];

      const userResult = await db.query(updateUserQuery, userValues)

      if(userResult.rowCount === 0){
        return {message: 'No se logro actualizar el usuario'}
      }

      const put = `UPDATE contratantes SET NIT = COALESCE(?, NIT) WHERE id_contratante = ?;`
      const values = [dataUpdate.NIT, dataUpdate.id];

      const result: any = await db.query(put, values);
      return {message: "Uusario actualizado exitosamente", result}
    }catch(err: any){
      console.error("Error al actualizar datos: ",err)
      throw err;
    }
  }

  static async updateContratista(dataUpdate: ContratistaDTO){
    
  try {
    const updateUserQuery = `UPDATE usuarios SET nombre_usuario = COALESCE($1, nombre_usuario), telefono = COALESCE($2, telefono), contraseña = COALESCE($3, contraseña), descripcion_usuario = COALESCE($4, descripcion_usuario), foto_perfil = COALESCE($5, foto_perfil), estado_perfil = COALESCE($6, estado_perfil), tipo_usuario = COALESCE($7, tipo_usuario) WHERE id_usuario = $8;`;

    const userValues = [dataUpdate.nombreCompleto, dataUpdate.telefono, dataUpdate.password, dataUpdate.descripcion, dataUpdate.fotoPerfil, dataUpdate.estadoPerfil, dataUpdate.tipoUsuario, dataUpdate.email];

    const userResult = await db.query(updateUserQuery, userValues)

    if (userResult.rowCount === 0) {
      return { message: 'No se encontró el usuario para actualizar.' };
    }
    const updateContratistaQuery = `UPDATE contratista SET cedula = COALESCE($1, cedula), categoria_trabajo = COALESCE($2, categoria_trabajo), hoja_vida = COALESCE($3, hoja_vida) WHERE id_contratista = $4;`;

    const contratistaValues = [dataUpdate.cedula, dataUpdate.categoriaTrabajo,  dataUpdate.id];

    const result = await db.query(updateContratistaQuery, contratistaValues);

    return {message: 'Usuario actualizado correctamente', result}
    } catch (err) {
      console.error('Error al actualizar usuario contratista:', err);
      throw err;
    }

  }

  static async deleteUser(email: string){
    const userdelete = `DELETE FROM usuarios WHERE email = $1`;
    const values = [email];

    return await db.query(userdelete, values);
  }

  // Proximo integración con coockies
  static async deleUser(id: Number){
    const userDelete = `Delete From usuarios where id = $1`;
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