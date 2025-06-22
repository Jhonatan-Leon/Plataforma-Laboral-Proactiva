import { check, validationResult} from 'express-validator';
import { NextFunction, Request, Response } from "express";


const validatorParams = async (req: Request, res: Response, next: NextFunction) => {
    const {emailOrPhone, password } = req.body;

    console.log(emailOrPhone, password)

    if(!emailOrPhone || !password){
        res.status(400).json({ message: 'Todos los datos son requeridos' });
        return;
    }

    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^3\d{9}$/;

    if (!emailValidator.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
        res.status(400).json({ message: 'Formato de email o teléfono inválido' });
        return;
    }

    next();

}


function validator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
}

export default {
    validatorParams,
    validator,

};