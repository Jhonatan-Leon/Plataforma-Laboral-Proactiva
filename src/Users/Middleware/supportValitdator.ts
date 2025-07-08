import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const supportValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar 100 caracteres'),
  body('email')
    .trim()
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Formato de correo inválido')
    .normalizeEmail(),
  body('commet')
    .trim()
    .notEmpty().withMessage('El comentario es obligatorio')
    .isLength({ max: 1000 }).withMessage('El comentario es demasiado largo'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(422).json({ errors: errors.array() });
	   return;
    }
    next();
  },
];