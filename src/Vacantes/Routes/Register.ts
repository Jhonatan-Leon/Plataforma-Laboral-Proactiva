import { Router } from "express";
import AñadirVacante from "../Controllers/AddVacante"; 
import {buscarVacante, buscarVacante2} from "../Controllers/BrowseVacante";
import EditarVacante from "../Controllers/UpdateVacante";
import EliminarVacante from "../Controllers/DeleteVacante";
import authorizeRole from "../../Users/Middleware/AuthorizeRole";
import verifyToken from "../../Users/Middleware/Verifytoken";
import validatorCookies from "../../Users/Middleware/ValidaterCookie";
import validateCreationVacant from "../Middleware/ValidatosCreation";
import upload from "../../Users/Helpers/Upload";
import obtenerTodas from "../Controllers/ObtenerVacante";
import obtenerVacanteUser from "../Controllers/ObtenerVacanteUser";
const router = Router()

router.post('/registrarVacante', upload.single('logo'), verifyToken, validatorCookies,authorizeRole(['contratante_formal','contratante_informal']), validateCreationVacant,  AñadirVacante); 
router.get('/consultarVacante/:cod_vacante',buscarVacante)
router.get('/obtn', obtenerTodas)
router.get('/misVacantes', verifyToken, validatorCookies, authorizeRole(['contratante_informal', 'contratante_formal']),  obtenerVacanteUser)
router.get('/consultarVacante',buscarVacante2)
router.put('/update/:cod_vacante',upload.single('logo'),  verifyToken, validatorCookies, authorizeRole(['contratante_informal','contratante_formal']), EditarVacante)
router.delete('/delete/:cod_vacante',  verifyToken, validatorCookies,  authorizeRole(['contratante_informal', 'contratante_formal']), EliminarVacante)

export default router;



