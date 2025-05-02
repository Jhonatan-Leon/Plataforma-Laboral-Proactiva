import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import generateToken from "../Helpers/generateTokens";

const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    try {
        const refreshSecret = process.env.REFRESH_KEY_TOKEN;
        const accessSecret = process.env.KEY_TOKEN;

        if (!refreshSecret || !accessSecret) {
            throw new Error("Claves JWT no definidas");
        }

        if (!token) {
            return res.status(403).json({ error: "No autorizado: refresh token no encontrado" });
        }

        // Verificar token
        const decoded = jwt.verify(token, refreshSecret) as JwtPayload;
        
        // Forma de firma
        const payload = (decoded as any).data ?? decoded;

        const newAccessToken = generateToken(
            {
                id: payload.id,
                estado_perfil: payload.estado_perfil,
                rol: payload.rol
            },
            accessSecret,
            15 
        );

        return res.status(200).json({ token: newAccessToken });

    } catch (error: any) {
        console.error("Error en refreshToken:", error);
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};




export default refreshToken;

