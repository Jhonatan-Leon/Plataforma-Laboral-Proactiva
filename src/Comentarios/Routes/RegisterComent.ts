import { Router } from "express";
import Registrar from "../Controllers/ControllerComentario";
import Get from "../Controllers/ControllerGet";
import Actualizar from "../Controllers/ControllerUpdate";
import Eliminar from "../Controllers/ControllerDelete";
import authorizeRole from "../../Users/Middleware/AuthorizeRole";
import verifyToken from "../../Users/Middleware/Verifytoken";
import validatorCookies from "../../Users/Middleware/ValidaterCookie";

const router = Router()

router.post('/registrarComentario', verifyToken, validatorCookies, authorizeRole(['contratante_formal', 'contratante_informal']), authorizeRole(['contratante_formal', 'contratante_informal']), Registrar );
router.get('/consultarComentario', verifyToken, validatorCookies,  authorizeRole(['contratista', 'contratante_formal', 'contratante_informal']), Get );
router.put('/actualizarComentario/:id_comentario',  authorizeRole(['Contratante']), Actualizar)
router.delete('/delete/:id_comentario', authorizeRole(['Contratante']), Eliminar)


export default router;