import { Request, Response } from 'express';
import  VideoRepository  from '../Repository/RepositoryVideo'; 


const  eliminarVideo= async(req: Request, res: Response): Promise<void>=> {
    try {
      const { fileId } = req.params;

      if (!fileId) {
        res.status(400).json({ error: 'Se requiere un ID de video.' });
        return;
      }

      const mensaje = await VideoRepository.eliminarVideo(fileId);
      res.status(200).json({ message: mensaje });
    } catch (error: any) {
      console.error('Error al eliminar el video:', error);
      res.status(500).json({ error: 'Error al intentar eliminar el video.' });
    }
}

export default eliminarVideo;

