import { Request, Response } from "express";
import Comentario from "../Dto/ComentarioDto";
import ServiceComent from "../Services/ComentService";
import codDto from "../Dto/IdDto";

let Actualizar = async (req:Request, res:Response) => {
    
    try {
    
    const id_comentario = parseInt(req.params.id_comentario);
    const {
        fecha_calificacion,
        reseña,
        calificacion
    } = req.body;

    const comentario = await ServiceComent.UpComent (new Comentario(fecha_calificacion, reseña, calificacion), new codDto(id_comentario)) 
    
    
    
    res.status(201).json({message: "Comentario Actualizada"})

    } catch (error:any) {
        if (error?.code === "ER_DUP_ENTRY") {
        res.status(500).json({error:error.message})
    }
    res.status(500).json({error:error.message})

    }

}

export default Actualizar;