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


const deactivateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.data?.id
    const { password } = req.body 

    if (!password) {
       res.status(400).json({ error: 'Password is required' })
       return;
    }

    console.log(userId, password) 
    await UserService.deactivateUser(userId, password)

    res.clearCookie('refreshToken', {
      httpOnly : true,
      sameSite : 'strict',
      secure   : process.env.NODE_ENV === 'production'
    })

    res.status(200).json({ status: 'Account deactivated successfully' })
    return;
  } catch (err: any) {
    switch (err.message) {
      case 'USER_NOT_FOUND':
        res.status(404).json({ error: 'User not found' })
        return;
      case 'ALREADY_INACTIVE':
        res.status(404).json({ error: 'Account already inactive' })
        return;
      case 'INVALID_PASSWORD':
        res.status(401).json({ error: 'Invalid password' })
        return;
      default:
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
        return;
    }
  }
}


export default {
    profile,
    deactivateUser
};