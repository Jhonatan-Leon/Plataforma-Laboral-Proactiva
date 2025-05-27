import { Request, Response, NextFunction } from "express";
import{validationResult} from 'express-validator'


// Validación de datos
export const ValidatorUser = (req: Request, res: Response, next: NextFunction): void => {
    
    const error = validationResult(req);
    const { nombreCompleto, email, telefono, telefono2, password, descripcion, fotoPerfil, municipio, tipoDocumento, numeroCedula, genero, estado_perfil, tipo_usuario, NIT, sector} = req.body;
    console.log("Datos de entrada: ", req.body);
    const fotoP = req.file;

    if (!nombreCompleto || !telefono || !email || !password || !municipio  || !tipo_usuario) {
        res.status(400).json({ message: 'Todos los datos son requeridos' });
        return;
    }else if (tipo_usuario && !['contratista', "contratante_formal", "contratante_informal"].includes(tipo_usuario)){
        res.status(400).json({message: "Tipo de usuario debe ser: Contratista o Contratante" })
    }

    if (tipo_usuario === "contratista" && (!numeroCedula || !genero)) {
        res.status(400).json({ message: 'Faltan campos obligatorios para contratista (cedula o genero)' });
    }

    if(tipo_usuario === "contratante_formal" && (!NIT || !sector)){
        res.status(400).json({ message: 'Faltan campos obligatorios para contratante formal (NIT,sectorl)' });
    }


    if (telefono.length < 10) {
        res.status(400).json({ message: 'El número ingresado no es válido' });
        return;
    }

    if (fotoP) {
        req.body.fotoPerfil = `data:${fotoP.mimetype};base64,${fotoP.buffer.toString('base64')}`;
    } else {
        req.body.fotoPerfil = null;
    }


    // Validación básica de email
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(email)) {
        res.status(400).json({ message: 'Formato de email inválido' });
        return;
    }

    if(!error.isEmpty()){
        res.status(422).json({ errors: error.array() });
        console.log("Error en middleware: ", + error.array());
        return;
    }

    

    next();
};
