import {Request, Response} from 'express'
import UserService from '../Services/UserServices'

const GetUsers = async ( req: Request, res: Response) => {
	try {
		const result = await UserService.getUsers();
		
		if(!result){
			res.status(400).json({error: 'No se encontraron usuarios '})
			return;
		}

		res.status(200).json(result)
		return;
	}catch(err){
        res.status(500).json({ message: 'Error al obtener usuarios.' });
		return;
	}
}

export default GetUsers;