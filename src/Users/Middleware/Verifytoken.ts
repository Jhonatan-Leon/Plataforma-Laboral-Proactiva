import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
    data: { id: number, estado_perfil: string, rol: string };
    exp: number;
    iat: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(403).json({ message: "No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as JwtPayload;
        req.body.id = decoded.data.id;
        req.body.estado_perfil = decoded.data.estado_perfil;
        req.body.rol = decoded.data.rol;
        return next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token expired, please refresh" });
        }
        res.status(401).json({ message: "Invalid token" });
    }
};


export default verifyToken;