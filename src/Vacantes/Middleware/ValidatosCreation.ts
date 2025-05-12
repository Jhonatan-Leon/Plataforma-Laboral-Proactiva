import { check } from "express-validator";


const validateCreationVacant = [
    check("nombre_vacante")
        .notEmpty()
        .isEmail()
        .withMessage("El nombre debe de ser valido"),

    check("descripcion_vacante")
        .optional()
        .isLength({ min: 10 })
        .withMessage("La descripcion debe contener min 10 caracteres"),

    check("estado")
        .optional()
        .isString()
        .isLength({ max : 20 })
        .withMessage("Debes de poner un estado"),

    check("ubicacion_vacante")
        .optional()
        .isLength({ min: 40 })
        .withMessage("La ubicacion debe contener min 40 caracteres"),

    check("categoria_trabajo")
        .optional()
        .isLength({ min: 10 })
        .withMessage("La categoria debe tener al menos 10 caracteres"),

];
export default validateCreationVacant