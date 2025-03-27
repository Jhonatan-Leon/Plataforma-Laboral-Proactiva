import { Router } from "express";
import AñadirVacante from "../Controllers/AddVacante"; 
import {buscarVacante, buscarVacante2} from "../Controllers/BrowseVacante";
import EditarVacante from "../Controllers/UpdateVacante";
import EliminarVacante from "../Controllers/DeleteVacante";
const router = Router()

router.post('/registrarVacante', AñadirVacante); 
router.get('/consultarVacante/:cod_vacante',buscarVacante)
router.get('/consultarVacante',buscarVacante2)
router.put('/update/:cod_vacante',EditarVacante)
router.delete('/delete/:cod_vacante',EliminarVacante)
export default router;



