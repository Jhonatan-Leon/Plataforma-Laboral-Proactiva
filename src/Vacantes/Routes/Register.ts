import { Router } from "express";
import AñadirVacante from "../Controllers/AddVacante"; 
import {buscarVacante, buscarVacante2} from "../Controllers/BrowseVacante";
import EditarVacante from "../Controllers/UpdateVacante";
import EliminarVacante from "../Controllers/DeleteVacante";
import authorizeRole from "../../Users/Middleware/AuthorizeRole";
import validateCreationVacant from "../Middleware/ValidatosCreation";
import verifyToken from "../../Users/Middleware/Verifytoken";
import validatorCookies from "../../Users/Middleware/ValidaterCookie";
const router = Router()

router.post('/registrarVacante', authorizeRole(['contratante_formal','contratante_informal']), verifyToken, validatorCookies, validateCreationVacant,  AñadirVacante); 
router.get('/consultarVacante/:cod_vacante',buscarVacante)
router.get('/consultarVacante',buscarVacante2)
router.put('/update/:cod_vacante',  authorizeRole(['Contratante']), EditarVacante)
router.delete('/delete/:cod_vacante',  authorizeRole(['Contratante']), EliminarVacante)

export default router;



