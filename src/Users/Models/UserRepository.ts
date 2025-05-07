import Usuario from "../DTO/UserDto";
import db from "../../Config/config-db";
import { ContratanteDTO, ContratistaDTO } from "../DTO/tiposUsuario";
import bcrypt from 'bcryptjs'
import Auth from "../DTO/AuthDTO";

class UserRepository {


    /*
    static async add(User: Usuario){

      if (!User.estadoPerfil) {
        User.estadoPerfil = "activo";
      }
    
      console.log("Estado del perfil antes de insertar:", User.estadoPerfil);

      console.log(User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.estadoPerfil, User.fotoPerfil ?? null, User.tipoUsuario)
      const sql = `INSERT INTO usuarios (nombre_usuario, email, telefono, password, descripcion_usuario, foto_perfil, estado_perfil, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [ User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.fotoPerfil ?? null, User.estadoPerfil, User.tipoUsuario];        
        console.log("Consulta: ", sql)
        console.log("Variables Repository: ",values)
        try {
          const [result]: any = await db.execute(sql, values);
          return result.insertId;
      } catch (error) {
          console.error("Error al insertar usuario:", error);
          throw error;
      }
  
    } 
    */
    static async addContratante(User: ContratanteDTO) {

      if(User.estadoPerfil == "activo"){
        const sql = `INSERT INTO usuarios (nombre_usuario, email, telefono, password, descripcion_usuario, foto_perfil, estado_perfil, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [ User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.fotoPerfil ?? null, User.estadoPerfil, User.tipoUsuario];        
        const [rows]: any = await db.query(sql, values)
        if(rows.affectedRows > 0){
          try{
            let Id = rows.insertId;
            const sql = `INSERT INTO Contratantes (id_contratate, NIT) VALUES (?, ?)`;
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
    }

    static async addContratista(User: ContratistaDTO) {

      if(User.estadoPerfil == "activo"){
        const sql = `INSERT INTO usuarios (nombre_usuario, email, telefono, password, descripcion_usuario, foto_perfil, estado_perfil, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [ User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.fotoPerfil ?? null, User.estadoPerfil, User.tipoUsuario];        
        const [rows]: any = await db.query(sql, values)
        if(rows.affectedRows > 0){
          try{
            const Id = rows.insertId;
            const sql = `INSERT INTO Contratistas (id_contratista, cedula, categoria_trabajo, hoja_vida) VALUES (?, ?, ?, ?)`;
            const values = [Id, User.cedula, User.categoriaTrabajo, User.hojaDeVida];
            return await db.query(sql, values);
          }catch(err) {
            console.log("Error al ingresar usuario Contratista", err)
            throw err;
          }
          
        } else {
           console.log("No se realizo ningun cambio")
        }
      }
    
    }


    static async login(auth: Auth) {
      try {
          const sql = 'SELECT id_usuario, estado_perfil, tipo_usuario, password FROM usuarios WHERE email = ?';
          const values = [auth.email];
          const rows: any = await db.query(sql, values);
  
          if (!rows || rows.length === 0) {
              return { logged: false, status: "Correo o Contraseña incorrectos" };
          }
  
          const user = rows[0][0];
  
          if (user.estado_perfil === "inactivo") {
              return { logged: false, status: "Cuenta inactiva. Contacte al soporte." };
          }
  
          const isPasswordValid = await bcrypt.compare(auth.password, user.password);
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
        const query = `SELECT u.id_usuario, u.nombre_usuario, u.email, u.telefono, u.password, u.descripcion_usuario, u.foto_perfil, u.estado_perfil, u.tipo_usuario, c.NIT AS contratante_NIT, t.cedula AS contratista_cedula, t.categoria_trabajo, t.hoja_vida FROM usuarios u
          LEFT JOIN contratantes c ON u.id_usuario = c.id_contratante AND u.tipo_usuario = 'contratante' LEFT JOIN contratistas t ON u.id_usuario = t.id_contratista AND u.tipo_usuario = 'contratista'
          WHERE u.id_usuario = ?;`;

        const [rows]: any = await db.query(query, [Id]);

        if (rows.length === 0) return null;

        let user = rows[0];
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
        const query = `SELECT u.id_usuario, u.nombre_usuario, u.email, u.telefono, u.password, u.descripcion_usuario, u.foto_perfil, u.estado_perfil, u.tipo_usuario, c.NIT AS contratante_NIT, t.cedula AS contratista_cedula, t.categoria_trabajo, t.hoja_vida FROM usuarios u
          LEFT JOIN contratantes c ON u.id_usuario = c.id_contratante AND u.tipo_usuario = 'contratante' LEFT JOIN contratistas t ON u.id_usuario = t.id_contratista AND u.tipo_usuario = 'contratista'
          WHERE u.tipo_usuario = ?;`;
      
        const values = [tipo_usuario]
      
        console.log(values)

        const [rows]: any = await db.query(query, values);

        if(rows.length === 0) return null

        let list = rows.map((user: any) => {
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
  
          const [rows]: any = await db.query(query, [email]);
  
          if (rows.length === 0) return null;
  
          let user = rows[0];
          console.log("Usuario obtenido:", user);
  
          return user;
  
      } catch (error) {
          console.error("Error al obtener el usuario:", error);
          throw error;
      }
  }
  
  static async updateUser(user: any, email: string){
    try{
      const put = `UPDATE usuarios SET nombre_usuario = COALESCE(?, nombre_usuario), telefono = COALESCE(?, telefono), password = COALESCE(?, password), descripcion_usuario = COALESCE(?, descripcion_usuario),
            foto_perfil = COALESCE(?, foto_perfil), estado_perfil = COALESCE(?, estado_perfil), tipo_usuario = COALESCE(?, tipo_usuario) WHERE email = ?;`
      const values = [user.nombre_usuario, user.telefono, user.password, user.descripcion_usuario, user.foto_perfil, user.estado_perfil, user.tipo_usuario, email]
       const [rows]: any = await db.query(put, values)
       if (rows.affectedRows === 0) {
        return { message: "No se realizaron cambios o el usuario no existe." };
      }

      return { message: "Usuario actualizado con éxito", affectedRows: rows.affectedRows };
    }catch(err: any){
      console.error("Error registro usuarios: ", err)
      throw err;
    }
  }


  static async updateContratante(dataUpdate: ContratanteDTO){
    try{
      const put = `UPDATE contratantes SET NIT = COALESCE(?, NIT) WHERE id_contratante = ?;`
      const values = [dataUpdate.NIT, dataUpdate.id];

      const [rows]: any = await db.query(put, values);
      return rows
    }catch(err: any){
      console.error("Error al actualizar datos: ",err)
      throw err;
    }
  }

  static async updateContratista(dataUpdate: ContratistaDTO){
    try{
      const put = `UPDATE contratistas SET cedula = COALESCE(?, cedula), categoria_trabajo = COALESCE(?, categoria_trabajo), hoja_vida = COALESCE(?, hoja_vida) WHERE id_contratista = ?;;`
      
      const values = [dataUpdate.cedula, dataUpdate.categoriaTrabajo, dataUpdate.hojaDeVida, dataUpdate.id];

      const [rows]: any = await db.query(put, values);
      return rows
    }catch(err: any){
      console.error("Error al actualizar datos: ",err)
      throw err;
    }
  }

  static async deleteUser(email: string){
    const userdelete = `DELETE FROM usuarios WHERE email = ?`;
    const values = [email];

    return await db.query(userdelete, values);
  }

  // Proximo integración con coockies
  static async deleUser(id: Number){
    const userDelete = `Delete From usuarios where id = ?`;
    const values = [id];

    return await db.query(userDelete, values)
  }

  static async desactivarUser(idUser: string){
    const userdesactivar = `UPDATE usuarios SET estado_perfil = 'inactivo' WHERE id_usuario = ? AND estado_perfil != 'inactivo'`;
    const values = [idUser]

    const [rows]:any = await db.query(userdesactivar, values);

    return rows.affectedRows > 0
  }

}

export default UserRepository;