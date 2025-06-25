import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateChangePasswordBody = [
  body('currentPassword')
    .notEmpty().withMessage('La contraseña actual es obligatoria'),

  body('newPassword')
    .isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres'),

  body('confirmPassword')
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage('Las contraseñas no coinciden'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }
    next(); 
  }
];