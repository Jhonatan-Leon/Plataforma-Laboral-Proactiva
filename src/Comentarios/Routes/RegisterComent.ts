import { Router } from "express";
import Registrar from "../Controllers/ControllerComentario";
import Get from "../Controllers/ControllerGet";
import Actualizar from "../Controllers/ControllerUpdate";
import Eliminar from "../Controllers/ControllerDelete";
import authorizeRole from "../../Users/Middleware/AuthorizeRole";

const router = Router()

router.post('/registrarComentario',  authorizeRole(['Contratante']), Registrar );
router.get('/consultarComentario/:id_comentario',  authorizeRole(['Contratista','Contratante']), Get );
router.put('/actualizarComentario/:id_comentario',  authorizeRole(['Contratante']), Actualizar)
router.delete('/delete/:id_comentario', authorizeRole(['Contratante']), Eliminar)


export default router;