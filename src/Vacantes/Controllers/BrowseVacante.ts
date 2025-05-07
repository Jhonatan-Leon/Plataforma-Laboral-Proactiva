import { Request, Response } from "express";
import GestionVacantes from "../Services/VacanteService";
import {categoriaDto, codDto} from "../Dto/ConsultaDto";



let buscarVacante = async(req:Request, res: Response) => {
    try{
        const cod_vacante= parseInt(req.params.cod_vacante);

        console.log("Data",cod_vacante);

        const encontrar = await GestionVacantes.browse_vacant(new codDto(cod_vacante))
        console.log(encontrar);
        res.status(201).json(
            {
                status: 'lista',
                encontrar: encontrar
            }
        )
    }catch(error:any){
        console.log("Error: ", error);
        if (error?.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        }
        res.status(500).json({ error: "Server error" });
    }
    
}
let buscarVacante2 = async(req:Request, res: Response) => {
    try{
        const categoria_trabajo= req.body.categoria_trabajo;

        console.log("Data",categoria_trabajo);

        const encontrar = await GestionVacantes.browse_vacant2(new categoriaDto(categoria_trabajo))
        console.log(encontrar);
        res.status(201).json(
            {
                status: 'lista',
                encontrar: encontrar
            }
        )
    }catch(error:any){
        console.log("Error: ", error);
        if (error?.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        }
        res.status(500).json({ error: "Server error" });
    }
    
}

export {buscarVacante, buscarVacante2};