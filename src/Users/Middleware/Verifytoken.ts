import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { describe } from 'node:test';

dotenv.config();
interface JwtPayload {
    data: {id: number, estado_perfil: string},
    exp: number,
    iat: number
}


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let authorization = req.get('Authorization');    

    console.log(authorization);

    if (!authorization) {
        res.status(403).json({ status: "The Authorization header is required" });
        return;
    }

    const token = authorization.split(' ')[1];        
    if (!token) {
        res.status(401).json({ status: 'You have not sent a token' });
        return;
    }

    try {
        let decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as JwtPayload;            
        req.body.id = decoded.data.id;
        req.body.estado_perfil = decoded.data.estado_perfil;
        next();
    } catch (error) {
        res.status(403).json({ status: 'Unauthorized' });
        return;
    }
};


export default verifyToken;