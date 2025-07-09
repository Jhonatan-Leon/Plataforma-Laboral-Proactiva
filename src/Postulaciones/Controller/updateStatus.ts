import { Request, Response } from "express"
import postulacionServices from "../Services/PostualacionServices";

const patchStatus = async (req: Request, res: Response) => {
  const id = req.params.id
  const { estado } = req.body;

  console.log('Datos: ', id, estado)

  if (!id) {
     res.status(400).json({ message: 'ID inválido' })
	 return;
  }

  try {
    await postulacionServices.chageStatus(id, estado)
    res.status(200).json({ msg: 'Postulación rechazada' })
	return;
  } catch (err: any) {
    const status = /no encontrada/i.test(err.message) ? 404 : 400
    res.status(status).json({ message: err.message })
	return;	
  }
}


export default patchStatus;