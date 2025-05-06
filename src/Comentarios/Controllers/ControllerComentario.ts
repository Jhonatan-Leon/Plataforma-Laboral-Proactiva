import { Request, Response } from "express";
import Comentario from "../Dto/ComentarioDto";
import ServiceComent from "../Services/ComentService";

let Registrar = async (req:Request, res:Response) => {
    
    try {
    
    const {
        fecha_calificacion,
        reseña,
        calificacion
    } = req.body;

    const comentario = await ServiceComent.AddComent (new Comentario(fecha_calificacion, reseña, calificacion)) 
    
    
    
    res.status(200).json({message: "Comentario Registrado4324"})

    } catch (error:any) {
        if (error?.code === "ER_DUP_ENTRY") {
        res.status(400).json({error:error.message})
    }
    res.status(500).json({error:error.message})

    }

}

export default Registrar;