import {Request, Response} from "express";
import RegistrarVacante from "../Dto/VacanteDto";
import GestionVacantes from "../Services/VacanteService";




let AñadirVacante = async (req: Request, res: Response) => {
    try {
        const {
            nombre_vacante,
            descripcion_vacante,
            estado,
            ubicacion_vacante,
            categoria_trabajo,
        } = req.body;

        const vacante = await GestionVacantes.Add_Vacante(
            new RegistrarVacante(nombre_vacante, descripcion_vacante, estado, ubicacion_vacante, categoria_trabajo)
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
};





export default AñadirVacante;
