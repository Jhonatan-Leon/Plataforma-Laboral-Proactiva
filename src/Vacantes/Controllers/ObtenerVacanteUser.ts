import { Request, Response } from 'express';
import GestionVacantes from '../Services/VacanteService';

const obtenerVacanteUser = async (req: Request, res: Response) => {
    try {
		const token = req.user;

		if(!token){
			console.log("Token no improved: ", token)
		}


		const id = token.data.id;

        const vacantes = await GestionVacantes.obtenerVacantByUser(id);
        res.status(200).json(vacantes);
		return;
    } catch (error) {
        console.error('Error en VacanteController.obtenerTodas:', error);
        res.status(500).json({ message: 'Error al obtener las vacantes.' });
		return;
    }
}

export default obtenerVacanteUser;
