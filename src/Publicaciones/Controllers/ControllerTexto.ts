import { Request, Response } from "express";
import ServiceTexto from '../Services/PublicacioneService'

let CrearTexto = async (req:Request, res:Response) => {
    
    try {
    const {
        Texto
    } = req.body;

    const text = await ServiceTexto.AddTexto(Texto)
    
    
    
    res.status(200).json({message: "Texto insertado correctamente"})

    } catch (error:any) {
        if (error?.code === "ER_DUP_ENTRY") {
        res.status(400).json({error:error.message})
    }
    res.status(500).json({error:error.message})

    }

}

export default CrearTexto;