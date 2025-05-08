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
            return;
        }

        const secretKey = process.env.KEY_TOKEN;
        const refreshSecret = process.env.REFRESH_KEY_TOKEN;
        if (!secretKey || !refreshSecret) {
            throw new Error("Las claves KEY_TOKEN o REFRESH_KEY_TOKEN no están definidas");
        }

        const accessToken = generateToken(
            { id: login.id, estado_perfil: login.estado_perfil, rol: login.rol }, 
            secretKey, 
            1
        );

        // Refresh por 7 dias
        const refreshToken = generateToken(
             {id: login.id, estado_perfil: login.estado_perfil, rol: login.rol} , 
            refreshSecret, 
            7 * 24 * 60 
        );

        // Guardar refreshToken en cookie
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true,  
            secure: false,    
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: "localhost",
            path: '/Users/refresh'
           
        });

        console.log("NODE_ENV:", process.env.NODE_ENV)

        res.status(200).json({  
            status: login.status,
            token: accessToken
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};



export  {
    loginUser
    
};