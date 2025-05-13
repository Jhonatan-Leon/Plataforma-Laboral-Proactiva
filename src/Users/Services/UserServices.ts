import generateHash from "../Helpers/generateHash";
import UserRepository from "../Models/UserRepository";
import { ContratanteDTO, ContratistaDTO } from "../DTO/tiposUsuario";
import Auth from "../DTO/AuthDTO";
import { subirFotoPerfil, subirHojaVida } from "../Helpers/BlobServices";

class UserService {

    /*
    static async registerUser(user: Usuario) {
        user.password = await generateHash(user.password);
        return await UserRepository.add(user);
    }
    */


    static async registerContratante (User: ContratanteDTO){
        User.password = await generateHash(User.password)
        return await UserRepository.addContratante(User)
    }

    static async registerContratista(User: ContratistaDTO){
        User.password = await generateHash(User.password)
        const hoja = User.hojaDeVida;
        const foto = User.fotoPerfil;

        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            User.fotoPerfil = await subirFotoPerfil(foto); 
        }
      
        if (hoja && typeof hoja === 'string'){
            User.hojaDeVida = await subirHojaVida(hoja)
        }
        
        return await UserRepository.addContratista(User)
    }

    static async login(auth: Auth) {
        return await UserRepository.login(auth);
    }

    static async getUserById(id: string){
        return await UserRepository.getUserById(id)
    }

    static async getByRol(tipo_usuario: "Contratista" | "Contratante"){
        return await UserRepository.getByRol(tipo_usuario)
    }

    static async getUserByEmail(email: string){
        return await UserRepository.getUserByEmail(email)
    }
    /*

    static async updateUser(user: any, email: string){
        return await UserRepository.updateUser(user, email);
    }
    */
    static async updateContratante(updateUser: ContratanteDTO){
        return await UserRepository.updateContratante(updateUser);
    }

    static async updateContratista(updateUser: ContratistaDTO){
        return await UserRepository.updateContratista(updateUser);
    }

    static async deleteUserByEmail(email: string){
        return await UserRepository.deleteUser(email);
    }

    static async deactivateUser(UserId: string){
        return await UserRepository.desactivarUser(UserId);
    }
}

export default UserService;