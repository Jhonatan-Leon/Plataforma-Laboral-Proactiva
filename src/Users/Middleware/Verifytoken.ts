import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
interface JwtPayload {
    data: {id: number},
    exp: number,
    iat: number
}


const verifyToken =  (req: Request, res: Response, next: NextFunction) => {
    let authorization = req.get('Authorization');    

    console.log(authorization);

    if (authorization) {
        const token = authorization.split(' ')[1]        
        if (!token) {
            res.status(401).json(
                { status: 'you have not sent a token' }
            );
        };
        try {
            let decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as JwtPayload;            
            req.body.id = decoded.data.id;
            next()
        } catch (error) {
             res.status(403).json(
                { status: 'Unauthorized'}
            );
        }
    }
    res.status(403).json(
        { status: "The Authorization header is required"}
    );
}


export default verifyToken;