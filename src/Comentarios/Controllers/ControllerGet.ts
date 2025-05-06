import { Request, Response } from "express";
import ServiceComent from "../Services/ComentService";
import codDto from "../Dto/IdDto";

let Get = async (req:Request, res:Response) => {
    
    try {
    
    const id_comentario = parseInt(req.params.id_comentario);

    const comentario = await ServiceComent.GetComent (new codDto(id_comentario))
    console.log(comentario);
    
    
    
    res.status(201).json({message: "Comentario Obtenido"})

    } catch (error:any) {
        if (error?.code === "ER_DUP_ENTRY") {
        res.status(500).json({error:error.message})
    }
    res.status(500).json({error:error.message})

    }

}

export default Get;