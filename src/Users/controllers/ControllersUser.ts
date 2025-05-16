import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
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
            municipio,
            tipoDocumento,
            NumeroCedula,
            genero,
            sector,
            estadoPerfil,
            tipo_usuario,
            NIT,
            HabilidadesTecnicas,
            HabilidadesSociales,
            EstudiosComplementario,
            experiencia,
            categoria_trabajo,
        } = req.body;

       //Datos de entrada:
       console.log("Datos de entrada: ", req.body);

        let usuarioFinal: any;
        let ID: any;

        if (tipo_usuario === "Contratante" && NIT && sector ) {
           usuarioFinal = new ContratanteDTO(NIT, sector, nombreCompleto, email, telefono, password,descripcion, fotoPerfil , municipio, tipoDocumento,NumeroCedula,genero,sector, estadoPerfil, tipo_usuario);
           ID = await UserService.registerContratante(usuarioFinal);
        } 
        else if (tipo_usuario === "Contratista" && categoria_trabajo && HabilidadesTecnicas && HabilidadesSociales && EstudiosComplementario && experiencia) {
            usuarioFinal = new ContratistaDTO(HabilidadesTecnicas, HabilidadesSociales,EstudiosComplementario,experiencia, categoria_trabajo, nombreCompleto, email, telefono, password,descripcion, fotoPerfil,municipio,tipoDocumento,NumeroCedula,genero, estadoPerfil, tipo_usuario);
            const result: any = await UserService.registerContratista(usuarioFinal);
            ID = result.idUser;
        } else if(tipo_usuario === "informal" ) {
            usuarioFinal = new InformalDTO(nombreCompleto, email, telefono, password,descripcion, fotoPerfil , municipio, tipoDocumento,NumeroCedula,genero,estadoPerfil,tipo_usuario);
            ID = await UserService.registerContratanteInformal(usuarioFinal);
        }else {
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

