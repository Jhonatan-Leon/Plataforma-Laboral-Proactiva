import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import jwt from "jsonwebtoken";

let profile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const idUser = user?.data?.id;
    const estado = user?.data?.rol; 

    if (!idUser) {
      res.status(400).json({ error: "ID de usuario no válido o faltante" });
      return;
    }

    const userInfo = await UserService.getUserById(idUser);

    if (!userInfo) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.status(200).json({
      status: "Perfil encontrado correctamente",
      id: idUser,
      estado_perfil: estado,
      datos_usuario: userInfo
    });
  } catch (error: any) {
    console.error("Error obteniendo el perfil:", error);
    res.status(500).json({ error: "Ha ocurrido un error desconocido" });
  }
};


let deactivateUser = async (req: Request, res: Response) => {
  try {
      const TokenData = req.user;
      const userId = TokenData.data.id;

      // 3. Desactivación
      const result = await UserService.deactivateUser(userId);
        
      if (!result) {
        res.status(404).json({ error: "Operation failed" }); // Mensaje genérico
        return;
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