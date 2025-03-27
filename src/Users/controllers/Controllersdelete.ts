import { Request, Response } from "express";
import UserService from "../Services/UserServices";

const deleteUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        console.log(`Intentando eliminar usuario con email: ${email}`);

        const user = await UserService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        }

        await UserService.deleteUserByEmail(email);
        res.status(200).json({ message: "Usuario eliminado correctamente" });

    } catch (error: any) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: error.message });
    }
};

export {
    deleteUserByEmail
}