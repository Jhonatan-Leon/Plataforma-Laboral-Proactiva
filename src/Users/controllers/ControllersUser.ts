import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
import generateToken from "../Helpers/generateTokens";

let register = async (req: Request, res: Response) => {
    try {

        if(!req.body.estado_perfil){
            req.body.estado_perfil = "activo";
        }
        
        const {
            id,
            nombreCompleto, 
            email,
            telefono,
            telefono2,
            password,
            descripcion,
            fotoPerfil,
            municipio,
            tipoDocumento,
            numeroCedula,
            genero,
            sector,
            estado_perfil,
            tipo_usuario,
            documentNumber,
            HabilidadesTecnicas,
            HabilidadesSociales,
            EstudiosComplementario,
            experiencia,
            categoria_trabajo,
            Ocupacion,
            sitio_web
        } = req.body;

       
        const notificaciones = true;
       //Datos de entrada:
       console.log(`Datos de entrada: , Nombre: ${nombreCompleto}, email: ${email}, telefono: ${telefono}, telefono2: ${telefono2}, password: ${password}, descripcion: ${descripcion}, municipio ${municipio}, 
        tipoDocumento: ${tipoDocumento}, numeroCedula: ${numeroCedula}, NIT: ${documentNumber}, genero: ${genero}, sector: ${sector}, estadoPerfil: ${estado_perfil}, tipo_usuario: ${tipo_usuario}, NIT, HabilidadesTecnicas: ${HabilidadesTecnicas}, HabilidadesSociales ${HabilidadesSociales}
        , EstudiosComplementario: ${EstudiosComplementario}, experiencia: ${experiencia}, categoria_trabajo: ${categoria_trabajo}`);
        
        let usuarioFinal: any;
        let ID: any;

        if (tipo_usuario.toLowerCase() === "contratante_formal" && documentNumber && sector ) {
           usuarioFinal = new ContratanteDTO(documentNumber, sector, sitio_web, nombreCompleto, email, telefono, telefono2, password,descripcion, fotoPerfil , municipio, tipoDocumento, documentNumber, genero, estado_perfil, tipo_usuario, notificaciones);
           ID = await UserService.registerContratante(usuarioFinal);
        } else if (tipo_usuario.toLowerCase() === "contratista" && categoria_trabajo && HabilidadesTecnicas && HabilidadesSociales ) {
            usuarioFinal = new ContratistaDTO(HabilidadesTecnicas, HabilidadesSociales,EstudiosComplementario,experiencia, categoria_trabajo, Ocupacion, nombreCompleto, email, telefono, telefono2, password,descripcion, fotoPerfil,municipio,tipoDocumento,numeroCedula,genero, estado_perfil, tipo_usuario, notificaciones);
            const result: any = await UserService.registerContratista(usuarioFinal);
            ID = result.idUser;
        } else if(tipo_usuario.toLowerCase() === "contratante_informal") {
            usuarioFinal = new InformalDTO(nombreCompleto, email, telefono, telefono2, password,descripcion, fotoPerfil , municipio, tipoDocumento,numeroCedula,genero, estado_perfil,tipo_usuario, notificaciones);
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
            { id: ID  , estado_perfil: usuarioFinal.estadoPerfil, rol: usuarioFinal.tipoUsuario }, 
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
            path: '/'
           
        });
        res.status(200).json({ message: "Usuario registrado con éxito", token: accessToken, rol: usuarioFinal.tipoUsuario });
        return;
    } catch (error: any) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
            return;
        }
    }
};

export default register;

