import generateHash from "../Helpers/generateHash";
import UserRepository from "../Models/UserRepository";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
import Auth from "../DTO/AuthDTO";
import { subirFotoPerfil } from "../Helpers/BlobServices";
import { normalizaTipoDoc } from "../Helpers/normalizarDocumento";
import TipoDocumento from "../DTO/TipoDocumento";

class UserService {

    
    static async registerContratanteInformal(user: InformalDTO) {
        user.password = await generateHash(user.password);
        const foto = user.fotoPerfil;
        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            user.fotoPerfil = await subirFotoPerfil(foto); 
        }
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

        const tipoDocumento: TipoDocumento = await normalizaTipoDoc(User.tipoDocumento);
        User.tipoDocumento = tipoDocumento;
        

        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            User.fotoPerfil = await subirFotoPerfil(foto); 
        }

        
        return await UserRepository.addContratista(User)
    }

    static async login(auth: Auth) {
        return await UserRepository.login(auth);
    }

    static async loginWithGoogle(email: string) {
        return await UserRepository.loginWithGoogle(email);
    }

    static async getUserById(id: string){
        const user = await UserRepository.getUserById(id)
        const {id_usuario, contraseña, estado_perfil, ... rest} = user;
        return rest;
    }

    static async getUsers(){
        const user = await UserRepository.getUser()
        return user                                                                                                 ;
    }

    static async getByRol(tipo_usuario: string){
        const result = await UserRepository.getByRol(tipo_usuario)
        return result;
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
        const foto = updateUser.fotoPerfil;

        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            updateUser.fotoPerfil = await subirFotoPerfil(foto); 
        }
        return await UserRepository.updateContratante(updateUser);
    }

    static async updateContratista(updateUser: ContratistaDTO){
        const foto = updateUser.fotoPerfil;

        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            updateUser.fotoPerfil = await subirFotoPerfil(foto); 
        }
        return await UserRepository.updateContratista(updateUser);
    }

    static async updateInformal(updateUser: InformalDTO){
        const foto = updateUser.fotoPerfil;

        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            updateUser.fotoPerfil = await subirFotoPerfil(foto); 
        }
        return await UserRepository.updateInformal(updateUser);
    }

    static async deleteUser(id: string){
        return await UserRepository.deleteUser(id);
    }

    static async deactivateUser(UserId: string){
        return await UserRepository.desactivarUser(UserId);
    }
}

export default UserService;