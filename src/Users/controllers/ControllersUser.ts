import { Request, Response } from "express";
import CreateUser from "../DTO/UserDto";

const User: CreateUser[] = [];

// Controlador para crear usuario
export const Users = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, lastName, age, birthDate, number, email, password } = req.body;

        // Validación rápida por si algún dato viene vacío
        if (!name || !lastName || !age || !birthDate || !number || !email || !password) {
            res.status(400).json({ message: 'Todos los datos son requeridos' });
            return;
        }

        const newUser = new CreateUser(name, lastName, age, birthDate, number, email, password);
        User.push(newUser);

        res.status(201).json({ message: 'Usuario registrado', user: newUser });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para obtener usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json(User);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default {
    Users,
    getUsers
};
