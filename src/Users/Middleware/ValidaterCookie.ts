import { NextFunction, Request, Response  } from "express";
import jwt from 'jsonwebtoken';

// Extendemos el request para incluir data
interface AuthenticatedRequest extends Request {
    data?: any;
}

const validatorCookies = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authCookie = req.cookies ['AuthCookies'];

    // Si no hay cookie devuelve error
    if (!authCookie){
        return res.status(401);
    }
        try{
            // si hay cookie verifica la contraseña del Token
            jwt.verify(authCookie, process.env.AccesTokenSectret, (err, user) => {
                if(err){
                    return res.status(403)
                }

                req.data = user;
                next();
            })
        }catch(err: any){
            res.status(403).json({err: err.message})
        }
}

export default validatorCookies;