import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import jwt from "jsonwebtoken";

let profile = async (req: Request, res: Response) => {
  const user = req.user;
  try {  
    const idUser = user.data.id;
    const estado = user.data.rol;
    res.status(200).json(
      { status: 'Get profile Ok', id: idUser, estado_perfil: estado }
    );
    return;
  } catch (error: any) {
    res.status(500).json({ errorInfo: "An unknown error has occurred" }
    );
    return;
  }
}


let deactivateUser = async (req: Request, res: Response) => {
  try {
      // 1. Verificación de autenticación
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // 2. Obtención consistente del ID
      let userId: string;
        
      // Prioridad 1: ID del usuario autenticado (JWT)
      if (req.user?.data?.id) {
          userId = req.user.data.id;
      } 
        
      // Prioridad 2: Token de refresco (fallback)
      else {
        const token = req.cookies?.refreshToken || req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error("Missing authentication token");
            
        const decoded = jwt.verify(token, process.env.REFRESH_KEY_TOKEN!) as { id: string };
        userId = decoded.id;
      }

      // 3. Desactivación
      const result = await UserService.deactivateUser(userId);
        
      if (!result) {
        return res.status(404).json({ error: "Operation failed" }); // Mensaje genérico
      }

      // 4. Limpiar cookies si es necesario
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
      });

      res.status(200).json({ status: "Account deactivated successfully" });
      return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error inactivating account" });
        return;
    }
};


export default {
    profile,
    deactivateUser
};