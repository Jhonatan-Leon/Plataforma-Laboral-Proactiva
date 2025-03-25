import { Request, Response } from "express";
import Usuario from "../DTO/UserDto";
import UserService from "../Services/UserServices";


let  register  = async (req: Request, res: Response) =>   {
        try {
            const {
                nombreCompleto,
                email,
                telefono,
                password,
                estadoPerfil,
                descripcion,
                fotoPerfil
            } = req.body;
            
            console.log("varibles", email, telefono, nombreCompleto, password, estadoPerfil, descripcion, fotoPerfil);

            const usuario =  await UserService.registerUser(new Usuario( email, telefono, nombreCompleto, password, estadoPerfil, descripcion, fotoPerfil));
            res.status(200).json({message: "Usuario registrado"})
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


export default register;

