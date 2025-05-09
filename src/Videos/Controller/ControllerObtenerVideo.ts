import { Request, Response } from "express";
import VideoRepository from "../Repository/RepositoryVideo";


const obtenervideo = async(req:Request, res:Response): Promise<void> => {
    try{
        
        const {fileId} = req.params;

        if(!fileId){
            res.status(400).json({error:"Se requiere un id del video"})
            return;
        }
        const mensaje = await VideoRepository.ObtenerVideo(fileId)
        res.status(200).json({message: mensaje});
    }catch(error: any){
        console.log("Error al obtener video", error);
        res.status(500).json({error: "Error al obtener video"})
    }
}
export default obtenervideo;