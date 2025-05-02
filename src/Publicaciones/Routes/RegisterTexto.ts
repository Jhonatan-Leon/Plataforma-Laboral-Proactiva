import { Router } from "express";
import CrearTexto from "../Controllers/ControllerTexto";
import EditarTexto from "../Controllers/ControllerEditarTexto";
import EliminarTexto from "../Controllers/ControllerEliminarTexto";
import ObtenerTexto from "../Controllers/ControllerConsultarTexto";



const router = Router()


router.post('/registrarTexto',CrearTexto)
router.put('/editarTexto/:id',EditarTexto)
router.delete('/eliminarTexto/:id', EliminarTexto)
router.get('/consultarTexto/:id', ObtenerTexto)

export default router;