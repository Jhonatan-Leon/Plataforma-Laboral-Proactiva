import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import { ContratanteDTO, ContratistaDTO } from "../DTO/tiposUsuario";
import generateToken from "../Helpers/generateTokens";

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

        let usuarioFinal: ContratanteDTO | ContratistaDTO;
        let ID: any;

        if (tipo_usuario === "Contratante" && NIT) {
           usuarioFinal = new ContratanteDTO(NIT, nombreCompleto, email, telefono, password,descripcion, fotoPerfil , estadoPerfil, tipo_usuario);
           const IdContratante = await UserService.registerContratante(usuarioFinal);
        } 
        else if (tipo_usuario === "Contratista" && cedula && categoria_trabajo && hojaDeVida) {
            usuarioFinal = new ContratistaDTO(cedula, categoria_trabajo, hojaDeVida, nombreCompleto, email, telefono, password,descripcion, fotoPerfil, estadoPerfil, tipo_usuario);
            const result: any = await UserService.registerContratista(usuarioFinal);
            ID = result.idUser;
        } 
        else {
            throw new Error("Datos insuficientes para registrar un Contratante o Contratista");
        }

        const secretKey = process.env.KEY_TOKEN;
        const refreshSecret = process.env.REFRESH_KEY_TOKEN;
        console.log(ID)

        if (!ID) {
            throw new Error("El ID del contratista no se obtuvo correctamente.");
           
        }

        const accessToken = generateToken(
            { id: ID , estado_perfil: usuarioFinal.estadoPerfil, rol: usuarioFinal.tipoUsuario }, 
            secretKey, 
            3
        );

        // Refresh por 7 dias
        const refreshToken = generateToken(
             {id: ID, estado_perfil: usuarioFinal.estadoPerfil, rol: usuarioFinal.tipoUsuario} , 
            refreshSecret, 
            7 * 24 * 60 
        );

        console.log(accessToken)
        console.log(refreshToken)

        // Guardar refreshToken en cookie
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true,  
            secure: false,    
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: "localhost",
            path: '/'
           
        });

        res.status(201).json({ message: "Usuario registrado con éxito", token: accessToken,  });
        return;
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return;
    }
};

export default register;

