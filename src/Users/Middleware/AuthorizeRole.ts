import { Request, Response, NextFunction } from "express";


const authorizeRole = (allowedRoles: string[]) => {
   return (req: Request, res: Response, next: NextFunction) => {
   const user = req.body;

   try {
        console.log("rol", user)
        console.log("roles", allowedRoles)

        const userRol = user.data.rol;
        console.log(userRol)
        if(!allowedRoles || !userRol){
            res.status(403).json({message: "Acceso denegado: Sin información suficiente"})
            return;
        }

        if (!allowedRoles.includes(user.data.rol)) {
         res.status(403).json({ message: "Acceso denegado: rol no autorizado" });
         return;
        }

        req.body = user;
        console.log(req.body)
        next();
    } catch (err) {
      console.log(err)
       res.status(403).json({ message: "Token inválido o expirado" });
       return;
    }
  };
};

export default authorizeRole;