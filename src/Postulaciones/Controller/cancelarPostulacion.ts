import { Request, Response } from 'express';
import  postulacionServices  from '../Services/PostualacionServices';

const cancelarPostulacion = async (req: Request, res: Response) => {
  	const idPost = req.params.id;        
  	const userId = req.user?.data?.id;          

	console.log(idPost)

 	if (!userId) {
    	res.status(401).json({ msg: 'Sin credenciales válidas' });
		return;
	}

  	if (!idPost) {
    	res.status(400).json({ msg: 'ID de postulación inválido' });
		return;
	}

  	try {
    	await postulacionServices.cancelarPostulacion(idPost, userId);
    	res.status(200).json({ msg: 'Postulación eliminada' });
		return;
	} catch (err) {
    	if ((err as Error).message === 'POST_NOT_FOUND') {
      	res.status(404).json({ msg: 'Postulación no encontrada' });
		return;
	}
    	console.error('[cancelarPostulacion]', err);
    	res.status(500).json({ msg: 'Error al eliminar postulación' });
		return;
	}
};

export default cancelarPostulacion;