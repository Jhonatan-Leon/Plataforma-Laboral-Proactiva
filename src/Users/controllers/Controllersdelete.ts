import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import jwt from "jsonwebtoken";

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // 1. Extraer ID del token en cookies (autenticación)
        const token = req.cookies?.refreshToken;
        if (!token) {
            res.status(401).json({ error: "Cookie de sesión requerida" });
            return;
        }

        // 2. Verificar token y obtener ID del solicitante
        const { id: userId } = jwt.verify(token, process.env.REFRESH_KEY_TOKEN!) as { id: string };

        console.log(`Usuario ${userId} solicitando eliminar ID: ${id}`);

        // 3. Eliminar usuario
        const result = await UserService.deleteUser(id);
        if (!result) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // 4. Limpiar cookies si se eliminó a sí mismo
        if (userId === id) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });
        }

        res.status(200).json({ 
            message: "Usuario eliminado",
            deletedId: id 
        });

    } catch (error: any) {
        console.error("Error:", error);
        
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: "Token inválido" });
            return;
        }
        
        res.status(500).json({ 
            error: "Error al eliminar usuario",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export {
    deleteUser
}