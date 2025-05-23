import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateUpdateUser = [

    check("nombreCompleto")
        .optional()
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres"),

    check("telefono")
        .optional()
        .isString()
        .isLength({ min: 10 })
        .withMessage("El teléfono debe contener solo números y tener al menos 10 dígitos"),

    check("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),

    check("descripcion")
        .optional()
        .isLength({ min: 10 })
        .withMessage("La descripción debe tener al menos 10 caracteres"),

    check("fotoPerfil")
        .optional()
        .isURL()
        .withMessage("La foto de perfil debe ser una URL válida"),

    check("estadoPerfil")
        .optional()
        .isIn(["activo", "inactivo"])
        .withMessage("El estado del perfil debe ser 'activo' o 'inactivo'"),

    check("tipo_usuario")
        .optional()
        .isIn(["Contratante", "Contratista"])
        .withMessage("El tipo de usuario debe ser 'Contratante' o 'Contratista'"),

    check("NIT")
        .optional()
        .isString()
        .withMessage("El NIT debe contener solo números"),

    check("cedula")
        .optional()
        .isString()
        .withMessage("La cédula debe contener solo números"),

    check("categoria_trabajo")
        .optional()
        .isString()
        .withMessage("La categoría de trabajo debe ser un texto válido"),


];

const validatorEmail = async (req: Request, res: Response, next: NextFunction) => {
    
    const error = validationResult(req);
    const {email} = req.params;

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

}

export default {
    validateUpdateUser,
    validatorEmail
}