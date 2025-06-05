import { Request,Response } from "express"
import GestionVacantes from "../Services/VacanteService";
import {codDto} from "../Dto/ConsultaDto";

let EliminarVacante=async(req:Request, res:Response)=>{
    try{
        const cod_vacante= parseInt(req.params.cod_vacante);
        console.log(cod_vacante)

        console.log("Info",cod_vacante);

        const deleteVacante = await GestionVacantes.Eliminar_vacant(new codDto(cod_vacante))
        console.log(deleteVacante);
        res.status(200).json({encontrar: deleteVacante})
        return;

    }catch(error:any){
        console.log("Error: ", error);
        if (error?.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        }
        res.status(500).json({ error: "Server error" });
    }
    
}

export default EliminarVacante;

