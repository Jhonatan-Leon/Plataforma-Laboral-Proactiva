import { Request, Response } from "express";
import ServiceComent from "../Services/ComentService";
import codDto from "../Dto/IdDto";

let Get = async (req:Request, res:Response) => {
    const user = req.user;
    try {
    const id_user = user?.data?.id;

    const comentario = await ServiceComent.GetComent (new codDto(id_user))
    
    if (comentario.length === 0) {
        res.status(404).json({message: "Comentario no encontrado"})
        return;
    }
    
    res.status(201).json(comentario)
    return;

    } catch (error:any) {
        if (error?.code === "ER_DUP_ENTRY") {
        res.status(500).json({error:error.message})
        return;
    }
    res.status(500).json({error:error.message})

    }

}

export default Get;