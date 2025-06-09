import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import  jwt  from "jsonwebtoken";


const getUserById = async (req: Request, res: Response) => {
    try {
        const { id} = req.params;

        const token = req.cookies?.refreshToken || req.headers.authorization?.split(' ')[1];

        let userId: string | undefined;

        // 1. Extraer ID del token (prioritario)

        if (token) {
            const decoded = jwt.verify(token, process.env.REFRESH_KEY_TOKEN!) as { id: string };
            userId = decoded.id;
        }        

        

        console.log(`Buscando usuario con ID: ${id}`);

        const user = await UserService.getUserById(id);

        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario encontrado", usuario: user });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const getByRol = async (req: Request, res: Response) => {
    try {
        const {tipo_usuario} = req.params;

        console.log(tipo_usuario)

        let tipo;

        if(tipo_usuario == "contratista"){
            tipo = await UserService.getByRol(tipo_usuario)
        }

        if(!tipo){
            res.status(404).json({ message: "Usuario no encontrados "})
        }

        res.status(200).json(tipo)
    }catch(err: any){
        console.log(err);
        res.status(500).json({ err: err.message })
    }
}

export  {
    getUserById,
    getByRol
};


