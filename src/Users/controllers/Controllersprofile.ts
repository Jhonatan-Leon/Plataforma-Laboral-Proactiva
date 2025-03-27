import { Request, Response } from "express";
import UserService from "../Services/UserServices";

let profile = async (req: Request, res: Response) => {
  try {    
    const idUser = req.body.id;
    const estado = req.body.estado_perfil;
    res.status(200).json(
      { status: 'Get profile Ok', id: idUser, estado_perfil: estado }
    );
  } catch (error: any) {
    res.status(500).json({ errorInfo: "An unknown error has occurred" }
    );
  }
}


let deactivateUser = async (req: Request, res: Response) => {
    try {
        // Verifica que el usuario esté autenticado
        const userId = req.body.id; 
            console.log(userId)

        if (!userId) {
            res.status(401).json({ status: "Unauthorized" });
        }

        // cambiar el estado del usuario a 'inactivo'
        const result = await UserService.deactivateUser(userId);

        if (!result) {
            res.status(404).json({ status: "User not found or already inactive" });
        }

        res.status(200).json({ status: "Account successfully deactivated" });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error inactivating account" });
    }
};


export default {
    profile,
    deactivateUser
};