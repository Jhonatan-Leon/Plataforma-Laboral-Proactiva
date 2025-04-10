import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

interface JwtPayload {
    data: { id: number, estado_perfil: string, rol: string };
    exp: number;
    iat: number;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(403).json({ message: "No token provided" });
        return;
    }

    try {
        // Intentar verificar el token
        let decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as JwtPayload;
        req.body.id = decoded.data.id;
        req.body.estado_perfil = decoded.data.estado_perfil;
        req.body.rol = decoded.data.rol;
        return next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            try {
                // Obtener el refreshToken desde las cookies
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    res.status(403).json({ message: "No refresh token provided" });
                }

                const peticionUrl = process.env.BACKEND_URL || "http://localhost:3000";

                // Hacer la solicitud para refrescar el token
                const refresh = await axios.post(`${peticionUrl}/refresh`, {}, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie }
                });

                const newAccessToken = refresh.data.token;

                // Asignar el nuevo accessToken al request para la siguiente solicitud
                req.headers["Authorization"] = `Bearer ${newAccessToken}`;

                // Continuar con la verificación del nuevo token
                verifyToken(req, res, next);
            } catch (refreshError) {
                res.status(401).json({ message: "Unable to refresh token, please log in again" });
            }
        }

        res.status(401).json({ message: "Invalid token" });
    }
};




export default verifyToken;