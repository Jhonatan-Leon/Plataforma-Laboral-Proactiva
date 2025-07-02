import {Response, Request} from 'express';
import postulacion from '../DTO/DtoPostulacion';
import postulacionServices from '../Services/PostualacionServices';


const resgisterPost = async (req: Request, res: Response) =>  {
	const user = req.user;

    try {
      const {
        cod_vacante,
        estado,
        fecha_postulacion,		
        comentario,
      } = req.body;	



	  const id_usuario = user?.data?.id;  
	  	if (!id_usuario) {                                  
      		res.status(401).json({ message: 'Sin credenciales válidas' });
			return;
    	}	

		console.log(cod_vacante, estado, fecha_postulacion, comentario)

      await postulacionServices.registrarPostulacion( new postulacion(cod_vacante, id_usuario, estado, fecha_postulacion,comentario));
      res.status(201).json({msg: 'Usuario postulado'});
	  return;
    } catch (err) {
      console.error('[registrarPostulacion]', err);
      res.status(500).json({ message: 'Error al registrar postulación' });
	  return;
    }
}

export default resgisterPost;