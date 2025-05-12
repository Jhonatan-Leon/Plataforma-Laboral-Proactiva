import { Request, Response } from "express";
import UserService from "../Services/UserServices";

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
    const user = req.user;

    try {
        // Verifica que el usuario esté autenticado
        const userId = user.data.id; 
        console.log(userId)

        if (!userId) {
            res.status(401).json({ status: "Unauthorized" });
            return;
        }

        // cambiar el estado del usuario a 'inactivo'
        const result = await UserService.deactivateUser(userId);

        if (!result) {
            res.status(404).json({ status: "User not found or already inactive" });
        }

        res.status(200).json({ status: "Account successfully deactivated" });
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