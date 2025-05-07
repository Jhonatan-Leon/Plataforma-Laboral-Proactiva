import { Request, Response } from "express";
import  FotoRepository  from "../Repository/FotoRepository";

 const Subirfoto = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No se subió ningún archivo" });
      return;
    }

    const fileId = await FotoRepository.uploadFoto(req.file);

    res.status(201).json({ 
      message: "Foto subida", 
      fileId,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export default Subirfoto;  