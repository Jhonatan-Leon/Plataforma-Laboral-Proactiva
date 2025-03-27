import { Request, Response } from "express";
import UserService from "../Services/UserServices";
import Auth from "../DTO/AuthDTO";
import generateToken from "../Helpers/generateTokens";


let loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        console.log(email, password);

        const login = await UserService.login(new Auth(email, password));
        console.log(login);

        if (!login.logged) {
            res.status(401).json({ status: login.status }); 
        }

        const secretKey = process.env.KEY_TOKEN;
        if (!secretKey) {
            throw new Error("KEY_TOKEN no está definido");
        }

            res.status(200).json({  
            status: login.status,
            token: generateToken({ id: login.id }, secretKey, 5),
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" }); // 🔥 Y aquí
    }
};



export  {
    loginUser
    
};