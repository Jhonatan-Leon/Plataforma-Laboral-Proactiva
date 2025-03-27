import { check, validationResult} from 'express-validator';
import { NextFunction, Request, Response } from "express";


const validatorParams = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password } = req.body;

    if(!email || !password){
        res.status(400).json({ message: 'Todos los datos son requeridos' });
        return;
    }

    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(email)) {
        res.status(400).json({ message: 'Formato de email inválido' });
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