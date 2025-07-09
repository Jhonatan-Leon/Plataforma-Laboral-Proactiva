import generateHash from "../Helpers/generateHash";
import UserRepository from "../Models/UserRepository";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
import Auth from "../DTO/AuthDTO";
import { subirFotoPerfil } from "../Helpers/BlobServices";
import { normalizaTipoDoc } from "../Helpers/normalizarDocumento";
import TipoDocumento from "../DTO/TipoDocumento";
import bcrypt from "bcryptjs";
import { MailService } from '../../Services/Emails'; 
import { Jwt } from "jsonwebtoken";


class UserService {

    
    static async registerContratanteInformal(user: InformalDTO) {
        user.password = await generateHash(user.password);
        const foto = user.fotoPerfil;
        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            user.fotoPerfil = await subirFotoPerfil(foto); 
        }
        const tipo_documento: TipoDocumento = await normalizaTipoDoc(user.tipoDocumento);
        user.tipoDocumento = tipo_documento;

        const savedUser =  await UserRepository.addContratanteInformal(user);

        MailService.sendWelcomeEmail(user.email, user.nombreCompleto)
            .catch(err => console.error('Error enviando e-mail de bienvenida:', err));

        return savedUser;
    }

    static async registerContratante (User: ContratanteDTO){
        User.password = await generateHash(User.password)
        const foto = User.fotoPerfil;
        if(foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            User.fotoPerfil = await subirFotoPerfil(foto); 
        }
        const savedUser = await UserRepository.addContratante(User)
        
        MailService.sendWelcomeEmail(User.email, User.nombreCompleto)
            .catch(err => console.error('Error enviando e-mail de bienvenida:', err));

        return savedUser;
    }

    static async registerContratista(User: ContratistaDTO){
        User.password = await generateHash(User.password)
        const foto = User.fotoPerfil;

        const tipoDocumento: TipoDocumento = await normalizaTipoDoc(User.tipoDocumento);
        User.tipoDocumento = tipoDocumento;
        

        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            User.fotoPerfil = await subirFotoPerfil(foto); 
        }

        
       const savedUser = await UserRepository.addContratista(User);

        console.log(User.email, User.nombreCompleto)
        MailService.sendWelcomeEmail(User.email, User.nombreCompleto)
        .catch(err => console.error('Error enviando e-mail de bienvenida:', err));

        return savedUser;
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

        const tipoDocumento: TipoDocumento = await normalizaTipoDoc(updateUser.tipoDocumento);
        updateUser.tipoDocumento = tipoDocumento;
        return await UserRepository.updateContratista(updateUser);
    }

    static async updateInformal(updateUser: InformalDTO){
        const foto = updateUser.fotoPerfil;

        if (foto && typeof foto === 'string' && foto.startsWith('data:image')) {
            updateUser.fotoPerfil = await subirFotoPerfil(foto); 
        }

        const tipoDocumento: TipoDocumento = await normalizaTipoDoc(updateUser.tipoDocumento);
        updateUser.tipoDocumento = tipoDocumento;
        return await UserRepository.updateInformal(updateUser);
    }

    static async deleteUser(id: string){
        return await UserRepository.deleteUser(id);
    }

    static async deactivateUser(UserId: string, password: string){
        const user = await UserRepository.getUserById(UserId)
        if (!user) throw new Error('USER_NOT_FOUND')

        if (user.estado_perfil === 'inactivo') {
            throw new Error('ALREADY_INACTIVE')
        }

        const valid = await bcrypt.compare(password, user.contraseña)
        if (!valid) throw new Error('INVALID_PASSWORD')

        const updated = await UserRepository.desactivarUser(UserId)
        if (!updated) throw new Error('UPDATE_FAILED')
    }

   static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await UserRepository.getUserById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await bcrypt.compare(currentPassword, user.contraseña);
    if (!isMatch) throw new Error('Contraseña actual incorrecta');

    if (await bcrypt.compare(newPassword, user.contraseña)) {
        throw new Error('La nueva contraseña no puede ser igual a la actual');
    }

    const hashed = await generateHash(newPassword);
    await UserRepository.changePassword(userId, hashed);

    await MailService.sendPasswordChangeEmail(
        user.correo_electronico,
        user.nombre_completo,
        new Date(),
    );

    return { msg: 'Contraseña actualizada y correo enviado' };
    }
}

export default UserService;