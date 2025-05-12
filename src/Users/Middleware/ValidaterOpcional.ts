import { Request, Response, NextFunction } from "express";
import{validationResult} from 'express-validator'



export const ValidatorOpcional = (req: Request, res: Response, next: NextFunction): void => {

    const error = validationResult(req);
    const { id ,NIT, cedula, categoria_trabajo } = req.body;
    const file = req.files as {[key: string]: Express.Multer.File[]};


    /*
    if(NIT && !/^\d{9,11}$/.test(NIT)){
        res.status(400).json({ message: " NTI debe ser de 9 o 10 digitos o NIT invalido "})
    */

    const hoja = file?.hojaDeVida?.[0]
    if(hoja){
        req.body.hojaDeVida = `data:${hoja.mimetype};base64,${hoja.buffer.toString('base64')}`;
    } else {
        req.body.hojaDeVida = null;
    }
    

    if(cedula && !/^\d{10}$/.test(cedula)){
        res.status(400).json({ message: "Cedula invalida o cantida de digitos incorrecta minimo 10"})
        
    }else if(categoria_trabajo && typeof categoria_trabajo !== "string"){
        
        res.status(400).json({ message: "Cateogira invalida"})
    }

    if(!error.isEmpty()){
        res.status(422).json({ errors: error.array() });
        console.log("Error en middleware: ", + error.array());
        return;
    }

    next();

}

