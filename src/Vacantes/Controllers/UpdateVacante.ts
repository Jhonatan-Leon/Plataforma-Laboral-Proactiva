import { Response, Request } from "express"
import GestionVacantes from "../Services/VacanteService";
import {codDto} from "../Dto/ConsultaDto";
import RegistrarVacante from "../Dto/VacanteDto";
import UserService from "../../Users/Services/UserServices";
import { log } from "console";

let EditarVacante = async( req: Request, res: Response ) => {
    try {
        const token = req.user;
        const cod_vacante= parseInt(req.params.cod_vacante);
        const {
            nombre_vacante,
            personal_contacto,
            forma_contacto,
            ubicacion_vacante,
            descripcion_vacante,
            logo,
            salario,
            disponibilidad,
            categoria_trabajo
        } = req.body;

        console.log('datos: ',  nombre_vacante, personal_contacto, forma_contacto, ubicacion_vacante, descripcion_vacante, logo, salario, disponibilidad, categoria_trabajo)
        
        const id_user = token.data.id;

         const phoneRegex = /^(3\d{9}|[1-9]\d{6})$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let telefono: string | null = null;
        let email: string | null = null;

        if (emailRegex.test(forma_contacto)) {
            email = forma_contacto ?? null;
        } else if (phoneRegex.test(forma_contacto)) {
            telefono = forma_contacto ?? null;
        }else{
            console.log('formato invalido')
        }

        
        const updateVacante = new RegistrarVacante( nombre_vacante, personal_contacto, telefono , ubicacion_vacante, descripcion_vacante, logo, salario, disponibilidad, categoria_trabajo, id_user, email)

        const vacante = await GestionVacantes.actualizarVacante(cod_vacante, updateVacante);
        console.log(vacante);
        
       
        res.status(200).json(vacante);

    } catch (error: any) {
        console.log("Error: ", error);
        if (error?.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        }
        res.status(500).json({ error: "Server error" });
    }
}

export default EditarVacante