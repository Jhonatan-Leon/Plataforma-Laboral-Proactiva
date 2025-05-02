import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import Usuario from "../DTO/UserDto"; 
import { ContratanteDTO, ContratistaDTO } from "../DTO/tiposUsuario";

let register = async (req: Request, res: Response) => {
    try {
        const {
            id,
            nombreCompleto,
            email,
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

        console.log(`Variables recibidas: Id: ${id} nombre: ${nombreCompleto}, email: ${email}, telefono: ${telefono}, password: ${password} ,
            descripcion: ${descripcion}, fotoPerfil: ${fotoPerfil}, tipo_usuario: ${tipo_usuario}, NIT: ${NIT}, cedula: ${cedula}, categoriaTrabajo: ${categoria_trabajo}, hojaDeVida: ${hojaDeVida}`);
        
            //const User = await  UserService.registerUser(new Usuario( nombreCompleto, email, telefono, password,descripcion, fotoPerfil, estadoPerfil, tipo_usuario));

        let usuarioFinal: ContratanteDTO | ContratistaDTO;

        if (tipo_usuario === "Contratante" && NIT) {
           usuarioFinal = new ContratanteDTO(NIT, nombreCompleto, email, telefono, password,descripcion, fotoPerfil, estadoPerfil, tipo_usuario);
           await UserService.registerContratante(usuarioFinal);
        } 
        else if (tipo_usuario === "Contratista" && cedula && categoria_trabajo) {
            usuarioFinal = new ContratistaDTO(cedula, categoria_trabajo, hojaDeVida, nombreCompleto, email, telefono, password,descripcion, fotoPerfil, estadoPerfil, tipo_usuario);
             await UserService.registerContratista(usuarioFinal);
        } 
        else {
            throw new Error("Datos insuficientes para registrar un Contratante o Contratista");
        }

        res.status(201).json({ message: "Usuario registrado con éxito", usuario: usuarioFinal });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default register;

