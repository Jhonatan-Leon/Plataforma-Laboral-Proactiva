import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest} from "./ValidaterCookie";

const authorizeRole = (allowedRoles: string[]) => {
   return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
   const user = req.data;
   try {
        if(!allowedRoles || !user.rol){
            res.status(403).json({message: "Acceso denegado: Sin información suficiente"})
        }

        if (!allowedRoles.includes(user.rol)) {
         res.status(403).json({ message: "Acceso denegado: rol no autorizado" });
         return;
        }

        req.data = user;
        next();
    } catch (err) {
       res.status(403).json({ message: "Token inválido o expirado" });
       return;
    }
  };
};

export default authorizeRole;