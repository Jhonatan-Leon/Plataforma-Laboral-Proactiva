import { Request, Response, NextFunction } from "express";


const authorizeRole = (allowedRoles: string[]) => {
   return (req: Request, res: Response, next: NextFunction) => {
   const user = req.user;

   try {
        console.log("roles", allowedRoles)
        console.log(user)
        const userRol = user.data.rol;
        if(!allowedRoles || !userRol){
            res.status(403).json({message: "Acceso denegado: Sin información suficiente"})
            return;
        }

        if (!allowedRoles.includes(user.data.rol)) {
         res.status(403).json({ message: "Acceso denegado: rol no autorizado" });
         return;
        }

       
        next();
    } catch (err) {
      console.log(err)
       res.status(403).json({ message: "Token inválido o expirado" });
       return;
    }
  };
};

export default authorizeRole;