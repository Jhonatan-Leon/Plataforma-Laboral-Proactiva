"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateUpdateUser = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .isEmail()
        .withMessage("El correo electrónico es obligatorio y debe ser válido"),
    (0, express_validator_1.check)("nombreCompleto")
        .optional()
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres"),
    (0, express_validator_1.check)("telefono")
        .optional()
        .isString()
        .isLength({ min: 10 })
        .withMessage("El teléfono debe contener solo números y tener al menos 10 dígitos"),
    (0, express_validator_1.check)("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
    (0, express_validator_1.check)("descripcion")
        .optional()
        .isLength({ min: 10 })
        .withMessage("La descripción debe tener al menos 10 caracteres"),
    (0, express_validator_1.check)("fotoPerfil")
        .optional()
        .isURL()
        .withMessage("La foto de perfil debe ser una URL válida"),
    (0, express_validator_1.check)("estadoPerfil")
        .optional()
        .isIn(["activo", "inactivo"])
        .withMessage("El estado del perfil debe ser 'activo' o 'inactivo'"),
    (0, express_validator_1.check)("tipo_usuario")
        .optional()
        .isIn(["Contratante", "Contratista"])
        .withMessage("El tipo de usuario debe ser 'Contratante' o 'Contratista'"),
    (0, express_validator_1.check)("NIT")
        .optional()
        .isString()
        .withMessage("El NIT debe contener solo números"),
    (0, express_validator_1.check)("cedula")
        .optional()
        .isString()
        .withMessage("La cédula debe contener solo números"),
    (0, express_validator_1.check)("categoria_trabajo")
        .optional()
        .isString()
        .withMessage("La categoría de trabajo debe ser un texto válido"),
    (0, express_validator_1.check)("hojaDeVida")
        .optional()
        .isURL()
        .withMessage("La hoja de vida debe ser una URL válida")
];
const validatorEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    const { email } = req.params;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(email)) {
        res.status(400).json({ message: 'Formato de email inválido' });
        return;
    }
    if (!error.isEmpty()) {
        res.status(422).json({ errors: error.array() });
        console.log("Error en middleware: ", +error.array());
        return;
    }
    next();
});
exports.default = {
    validateUpdateUser,
    validatorEmail
};
