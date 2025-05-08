import { Request, Response } from "express";
import VideoRepository from "../Repository/RepositoryVideo"; // Importa el repositorio de videos

const SubirVideo = async (req: Request, res: Response) => {
    // Asegúrate de que se haya cargado un archivo
    if (!req.file) {
        res.status(400).send('No se ha cargado ningún archivo.');
        return;
    }

    console.log(req.file)

    try {
        console.log("Archivo recibido en el controlador:", req.file);

        // Verificar que el archivo sea un video
        if (!req.file.mimetype.startsWith('video/')) {
            res.status(400).json({ message: "El archivo no es un video válido" });
            return;
        }

        // Subir el video al repositorio
        console.log("Subiendo video...");
        const videoId = await VideoRepository.uploadVideo(req.file);

        // Devolver el ID del archivo cargado
        res.status(200).json({
            message: "Video subido correctamente",
            fileId: videoId,
        });

    } catch (error) {
        console.error("Error al subir el video a GridFS:", error);
        res.status(500).send("Error al subir el video");
    }
};

/*
const SubirVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Archivo recibido en el controlador:", req.file);
  
      if (!req.file) {
        res.status(400).json({ message: "No se subió ningún archivo" });
        return;
      }
  
      // Verificamos que el archivo sea un video
      if (!req.file.mimetype.startsWith('video/')) {
        res.status(400).json({ message: "El archivo no es un video válido" });
        return;
      }
  
      console.log("Subiendo video...");
      const videoId = await VideoRepository.uploadVideo(req.file); // Si hay algún error en la subida, lo atrapará el catch
  
      console.log("Video subido con éxito.");
      res.status(201).json({
        message: "Video subido exitosamente",
        videoId,
      });
    } catch (error : any) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error interno al subir el video", error: error.message });
    }
  };
 */ 

export default SubirVideo;
