import { Request, Response, NextFunction } from "express";
import{validationResult} from 'express-validator'


// Validación de datos
export const ValidatorUser = (req: Request, res: Response, next: NextFunction): void => {
    
    const error = validationResult(req);
    const { nombreCompleto, telefono, estadoPerfil, email, password, descripcion, tipo_usuario} = req.body;

    const file = req.files as {[key: string]: Express.Multer.File[]};

    if (!nombreCompleto || !telefono || !email || !password  || !descripcion) {
        res.status(400).json({ message: 'Todos los datos son requeridos' });
        return;
    }else if (tipo_usuario && !['Contratista', "Contratante"].includes(tipo_usuario)){
        res.status(400).json({message: "Tipo de usuario debe ser: Contratista o Contratante" })
    }


    if (telefono.length < 10) {
        res.status(400).json({ message: 'El número ingresado no es válido' });
        return;
    }

    const fotoP = file.fotoPerfil?.[0]
    if (fotoP) {
        req.body.fotoPerfil = `data:${fotoP.mimetype};base64,${fotoP.buffer.toString('base64')}`;
    } else {
        req.body.fotoPerfil = null;
    } 
    console.log("foto: ", req.body.fotoPerfil)


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
