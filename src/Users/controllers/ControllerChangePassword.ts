import UserService from '../Services/UserServices';
import { Request, Response } from 'express';


const changePassword = async (req: Request, res: Response) => {
  const data = req.user;
  const { currentPassword, newPassword } = req.body;

	const userId = data.data?.id;

  try {
    await UserService.changePassword(userId, currentPassword, newPassword);
    res.status(200).json({ msg: 'Contraseña actualizada correctamente' });
	return;
  	} catch (err: any) {
    	switch (err.message) {
    		case 'Usuario no encontrado':
       		res.status(404).json({ msg: err.message });
       		return;

    	case 'Contraseña actual incorrecta':
    	case 'La nueva Contraseña no puede ser igual a la actual':
       		res.status(400).json({ msg: err.message });
			return;

    	default:
      		console.error('[changePassword]', err);
      		res.status(500).json({ msg: 'Error del servidor' });
      	return;
  		}
	}
}

export default changePassword;