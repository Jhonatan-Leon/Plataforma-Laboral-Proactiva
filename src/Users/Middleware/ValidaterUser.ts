import { Request, Response, NextFunction } from "express";

// Validación de datos
export const ValidatorUser = (req: Request, res: Response, next: NextFunction): void => {
    const { name, lastName, age, number, birthDate, email, password } = req.body;

    if (!name || !lastName || !age || !number || !birthDate || !email || !password) {
        res.status(400).json({ message: 'Todos los datos son requeridos' });
        return; // Termina la ejecución aquí
    }

    if (typeof age !== 'number' || age <= 0) {
        res.status(400).json({ message: 'El número de edad ingresado no es válido' });
        return;
    }

    // Validación básica de email
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(email)) {
        res.status(400).json({ message: 'Formato de email inválido' });
        return;
    }

    next();
};
