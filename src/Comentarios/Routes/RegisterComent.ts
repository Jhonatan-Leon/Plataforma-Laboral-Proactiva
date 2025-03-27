import { Router } from "express";
import Registrar from "../Controllers/ControllerComentario";
import Get from "../Controllers/ControllerGet";
import Actualizar from "../Controllers/ControllerUpdate";
import Eliminar from "../Controllers/ControllerDelete";


const router = Router()

router.post('/registrarComentario', Registrar );
router.get('/consultarComentario/:id_comentario', Get );
router.put('/actualizarComentario/:id_comentario', Actualizar)
router.delete('/delete/:id_comentario', Eliminar)


export default router;