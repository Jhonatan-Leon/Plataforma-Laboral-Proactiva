import { Request, Response } from 'express';
import GestionVacantes from '../Services/VacanteService';

const obtenerTodas = async (req: Request, res: Response) => {
    try {
        const vacantes = await GestionVacantes.obtenerTodas();
        res.status(200).json(vacantes);
		return;
    } catch (error) {
        console.error('Error en VacanteController.obtenerTodas:', error);
        res.status(500).json({ message: 'Error al obtener las vacantes.' });
		return;
    }
}

export default obtenerTodas;