import { Request, Response, NextFunction } from 'express';

const validateMessage = (req: Request, res: Response, next: NextFunction):void => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Mensaje inválido.' });
    return;
  }

  next();
};
export default validateMessage;