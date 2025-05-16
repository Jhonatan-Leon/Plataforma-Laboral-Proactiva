import generateHash from "../Helpers/generateHash";
import UserRepository from "../Models/UserRepository";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
import Auth from "../DTO/AuthDTO";
import { subirFotoPerfil, subirHojaVida } from "../Helpers/BlobServices";

class UserService {

    
    static async registerContratanteInformal(user: InformalDTO) {
        user.password = await generateHash(user.password);
        return await UserRepository.addContratanteInformal(user);
    }

    static async registerContratante (User: ContratanteDTO){
        User.password = await generateHash(User.password)
        const foto = User.fotoPerfil;
        if(foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            User.fotoPerfil = await subirFotoPerfil(foto); 
        }
        return await UserRepository.addContratante(User)
    }

    static async registerContratista(User: ContratistaDTO){
        User.password = await generateHash(User.password)
        const foto = User.fotoPerfil;

        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            User.fotoPerfil = await subirFotoPerfil(foto); 
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