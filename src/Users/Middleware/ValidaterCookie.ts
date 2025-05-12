import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const validatorCookies = async (req: Request, res: Response, next: NextFunction) => {
  const authCookie = req.cookies.refreshToken;
  console.log(authCookie);
  if (!authCookie) {
    res.status(401).json({ message: "No se encontró la cookie de autenticación" });
    return;
  }

  const secret = process.env.REFRESH_KEY_TOKEN;
  if (!secret) {
    throw new Error("KEY_TOKEN no está definida en las variables de entorno");
  }

  try {
    jwt.verify(authCookie, secret, (err: any, user: any) => {
      if (err) {
        res.status(403).json({ message: "Token inválido o expirado" });
        return;
      }

      req.user = user;
      next();
    });
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

export default validatorCookies;
