import { Request, Response } from "express";
import postulacionServices from "../Services/PostualacionServices";


const GetPostulacionAplicada = async (req: Request, res: Response) => {
  try {
    const id = req.user?.data?.id;           

    if (!id) {
     	res.status(401).json({ message: 'Sin credenciales válidas' });
		return;
    }

    const postulaciones = await postulacionServices.getpostulacion(id);

    res.status(200).json( 		postulaciones );
	return;

  } catch (err: any) {
    	console.error('[GetPostulacionAplicada]', err);
    	res.status(500).json({ message: err.message ?? 'Error al obtener postulaciones' });
		return;
	}
}

export default GetPostulacionAplicada;