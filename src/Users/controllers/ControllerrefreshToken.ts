import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import generateToken from "../Helpers/generateTokens";

export const refreshToken = (req: Request, res: Response) => {
    try {
        const refreshSecret = process.env.REFRESH_KEY_TOKEN;
        if (!refreshSecret) {
            throw new Error("REFRESH_KEY_TOKEN no está definido");
        }

        const refreshToken = req.cookies.refreshToken;

        console.log("Refresh Token desde la cookie:", req.cookies);


        if (!refreshToken) {
            res.status(403).json({ error: "No autorizado" });
        }

        try {
            const decoded = jwt.verify(refreshToken, refreshSecret) as  JwtPayload ;
            const secretKey = process.env.KEY_TOKEN;
            if (!secretKey) {
                throw new Error("KEY_TOKEN no está definido");
            }
            
            const newAccessToken = generateToken(
                { id: decoded.data.id, estado_perfil: decoded.data.estado_perfil, rol: decoded.data.rol }, 
                secretKey, 
                5
            );
            
            res.status(200).json({ token: newAccessToken, cookie: req.cookies });
        } catch (err) {
            res.status(403).json({ error: "Token inválido o expirado" });
        }
    } catch (error: any) {
        console.error(error);
            res.status(500).json({ error: "Error en el servidor" });
    }
};

export default refreshToken;

