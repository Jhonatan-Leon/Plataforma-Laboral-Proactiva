import { Request, Response } from "express";
import ServiceTexto from "../Services/PublicacioneService";
import IdDto from "../Dto/IdDto";

let ObtenerTexto = async(req:Request, res:Response)=>{
    try{
        const id = req.params.id;
        
        const idDto = new IdDto(id);
        const result = await ServiceTexto.GetTexto(idDto);

        res.status(200).json({message: "Texto obtenido correctamente", data:result })

        } catch (error:any) {
            if (error?.code === "ER_DUP_ENTRY") {
            res.status(400).json({error:error.message})
        }
        res.status(500).json({error:error.message})

    }
}

export default ObtenerTexto