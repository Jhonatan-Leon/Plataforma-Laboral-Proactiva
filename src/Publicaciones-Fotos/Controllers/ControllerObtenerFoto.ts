import { Request, Response } from 'express';
import  FotoRepository  from '../Repository/FotoRepository';


const getFoto =async(req: Request, res: Response): Promise<void> => {
    try {
      const { fileId } = req.params;

      if (!fileId) {
        res.status(400).json({ error: 'Se requiere un ID de archivo.' });
        return;
      }

      const foto = await FotoRepository.GetFoto(fileId);

      if (typeof foto === 'string') {
        // Este caso es cuando el método devuelve un mensaje tipo "no se encontró..."
        res.status(404).json({ message: foto });
        return;
      }

      res.status(200).json(foto);
    } catch (error: any) {
      console.error('Error en getFoto controller:', error);
      res.status(500).json({ error: 'Error al obtener la información de la foto.' });
    }
}


export default getFoto