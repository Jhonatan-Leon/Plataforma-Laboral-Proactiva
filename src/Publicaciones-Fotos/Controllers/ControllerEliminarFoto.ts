import { Request, Response } from "express";
import FotoRepository from "../Repository/FotoRepository";


const EliminarFoto = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { fileId } = req.params;

    // Si no se proporciona un `fileId`, respondemos con un error
    if (!fileId) {
      res.status(400).json({ message: "Se debe proporcionar un ID de archivo" });
      return;
    }

    // Llamamos al repositorio para eliminar la foto usando el fileId
    const message = await FotoRepository.eliminarFoto(fileId);

    
    res.status(200).json({
      message,
    });
  } catch (error) {

    console.error("Error:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export default EliminarFoto;
