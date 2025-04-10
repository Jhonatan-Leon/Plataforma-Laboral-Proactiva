"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorUser = void 0;
const express_validator_1 = require("express-validator");
// Validación de datos
const ValidatorUser = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    const { nombreCompleto, telefono, estadoPerfil, email, password, descripcion, fotoPerfil, tipo_usuario } = req.body;
    if (!nombreCompleto || !telefono || !email || !password || !descripcion) {
        res.status(400).json({ message: 'Todos los datos son requeridos' });
        return;
    }
    else if (tipo_usuario && !['Contratista', "Contratante"].includes(tipo_usuario)) {
        res.status(400).json({ message: "Tipo de usuario debe ser: Contratista o Contratante" });
    }
    if (telefono.length < 10) {
        res.status(400).json({ message: 'El número ingresado no es válido' });
        return;
    }
    if (!fotoPerfil || fotoPerfil.trim() === "") {
        req.body.fotoPerfil = null;
    }
    // Validación básica de email
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
};
exports.ValidatorUser = ValidatorUser;
