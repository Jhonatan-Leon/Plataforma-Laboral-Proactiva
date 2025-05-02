import { Response, Request } from "express"
import ServiceTexto from "../Services/PublicacioneService";
import IdDto from "../Dto/IdDto";

let EditarTexto = async(req:Request, res:Response)=>{
    try{
        const id = req.params.id;
        const {
            Texto
        } = req.body;

        const idDto = new IdDto(id);
        const result = await ServiceTexto.UpTexto(idDto, Texto);

        res.status(200).json({message: "Texto actualizado correctamente"})

        } catch (error:any) {
            if (error?.code === "ER_DUP_ENTRY") {
            res.status(400).json({error:error.message})
        }
        res.status(500).json({error:error.message})

    }
}
export default EditarTexto