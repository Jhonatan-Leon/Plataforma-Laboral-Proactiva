import { Response, Request } from "express"
import GestionVacantes from "../Services/VacanteService";
import {codDto} from "../Dto/ConsultaDto";
import RegistrarVacante from "../Dto/VacanteDto";


let EditarVacante = async( req: Request, res: Response ) => {
    try {
        const cod_vacante= parseInt(req.params.cod_vacante);
        const {
            nombre_vacante,
            descripcion_vacante,
            estado,
            ubicacion_vacante,
            categoria_trabajo,
        } = req.body;

        const vacante = await GestionVacantes.Editar_vacant(
            new RegistrarVacante(nombre_vacante, descripcion_vacante, estado, ubicacion_vacante, categoria_trabajo), new codDto(cod_vacante)
        );

        console.log(vacante);
        res.status(201).json({ status: "Register ok" });

    } catch (error: any) {
        console.log("Error: ", error);
        if (error?.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        }
        res.status(500).json({ error: "Server error" });
    }
}

export default EditarVacante