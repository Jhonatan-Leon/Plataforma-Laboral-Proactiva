import { Request, Response } from "express";
import UserService from "../Services/UserServices";



const getUserById = async (req: Request, res: Response) => {
    try {
        const { id} = req.params;

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

        if(tipo_usuario == "Contratista"){
            tipo = await UserService.getByRol(tipo_usuario)
        }else if(tipo_usuario == "Contratante"){
            tipo = await UserService.getByRol(tipo_usuario)
        }

        if(!tipo){
            res.status(404).json({ message: "Usuario no encontrados "})
        }

        res.status(200).json({ message: `Usuarios tipo ${tipo_usuario} encontrados: `, tipo})
    }catch(err: any){
        console.log(err);
        res.status(500).json({ err: err.message })
    }
}

export  {
    getUserById,
    getByRol
};


