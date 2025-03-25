import Usuario from "../DTO/UserDto";
import db from "../Config/config-db";



class UserRepository {

    // Agregar usuario
    static async add(User: Usuario){
        const sql = `INSERT INTO Usuario (email, telefono, nombre_completo, password, estado_Perfil, descripcion, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [User.email, User.telefono, User.nombreCompleto, User.password, User.estadoPerfil ?? null, User.descripcion, User.fotoPerfil ?? null];
        console.log(values)
        return db.execute(sql, values);
    }

    
}

export default UserRepository;