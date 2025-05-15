import { Request, Response } from "express";
import generateHash from "../Helpers/generateHash";
import { ContratanteDTO, ContratistaDTO } from "../DTO/TipoUser";
import UserService from "../Services/UserServices";


let updateUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const {
            nombreCompleto,
            telefono,
            password,
            descripcion,
            fotoPerfil,
            estadoPerfil,
            tipo_usuario,
            NIT,
            cedula,
            categoria_trabajo,
            hojaDeVida
        } = req.body;

        console.log(`Actualizando usuario con email: ${email}`);
        
        // Buscar usuario por email y obtenemos la información de la base de datos
        const user: any = await UserService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }

        // se extrae información de la baes de datos y actualiza los valores enviados
        if (nombreCompleto !== undefined && nombreCompleto !== null) user.nombre_usuario = nombreCompleto;
        if (telefono !== undefined && telefono !== null) user.telefono = telefono;
        if (password !== undefined && password !== null) user.password = await generateHash(password);
        if (descripcion !== undefined && descripcion !== null) user.descripcion_usuario = descripcion;
        if (fotoPerfil !== undefined && fotoPerfil !== null) user.foto_perfil = fotoPerfil;
        if (estadoPerfil !== undefined && estadoPerfil !== null) user.estado_perfil = estadoPerfil;
        if (tipo_usuario !== undefined && tipo_usuario !== null && tipo_usuario !== user.tipo_usuario) {
        user.tipo_usuario = tipo_usuario;
        }


        /*  Guardar cambios en la base de datos
        await UserService.updateUser(user, email); */
        
        let usuarioFinal: ContratanteDTO | ContratistaDTO | null = null;
        
        if (tipo_usuario === "Contratante" && NIT) {
            usuarioFinal = new ContratanteDTO( NIT ?? user.NIT, user.nombre_usuario, user.email, user.telefono, user.password, user.descripcion, user.fotoPerfil, user.estadoPerfil, user.tipo_usuario, user.id);
            await UserService.updateContratante(usuarioFinal);
        } 
        else if (tipo_usuario === "Contratista" && (cedula || categoria_trabajo || hojaDeVida)) {
            usuarioFinal = new ContratistaDTO(cedula ?? user.cedula, categoria_trabajo ?? user.categoria_trabajo, hojaDeVida ?? user.hojaDeVida, user.nombre_usuario, user.email, user.telefono, user.password, user.descripcion, user.fotoPerfil, user.estadoPerfil, user.tipo_usuario, user.id);
            await UserService.updateContratista(usuarioFinal);
        }
        

        res.status(200).json({ message: "Usuario actualizado con éxito", usuario: usuarioFinal || user });
    } catch (error: any) {
        console.error(error);   
        res.status(500).json({ error: error.message });
    }
};


export {
    updateUser
}