import { Request, Response } from "express";
import postulacionServices from "../Services/PostualacionServices";

const getMisPostulaciones = async (req: Request, res: Response) => {
  const creatorId = req.user?.data?.id;

  if (!creatorId) {
	res.status(401).json({ msg: 'Sin credenciales' });
	return;
  } 

  console.log(creatorId)

  try {
    const postulaciones = await postulacionServices.listarPostulacionesDeVacante(creatorId);
    res.status(200).json( {postulaciones} );
	return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al obtener postulaciones' });
	return;
  }
};


export default getMisPostulaciones;