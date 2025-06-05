import {Request, Response} from "express";
import RegistrarVacante from "../Dto/VacanteDto";
import GestionVacantes from "../Services/VacanteService";
import UserService from "../../Users/Services/UserServices";




let AñadirVacante = async (req: Request, res: Response) => {
    try {
        const token = req.user;

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


        const id = token?.data?.id;
        if (!id) {
            console.log("ID del usuario no encontrado en el token");
        }


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


        const registerVacante = new RegistrarVacante(nombre_vacante, personal_contacto, telefono ?? null, ubicacion_vacante, descripcion_vacante, logo, salario, disponibilidad, categoria_trabajo, id, email??null)
        
        const vacante = await GestionVacantes.Add_Vacante(registerVacante);

        console.log(vacante);
        res.status(200).json({ status: "Register ok" });

    } catch (error: any) {
        console.log("Error: ", error);
        if (error?.code === "ER_DUP_ENTRY") {
            res.status(400).json({ errorInfo: error.sqlMessage });
        }
        res.status(500).json({ error: "Server error" });
    }
};





export default AñadirVacante;
