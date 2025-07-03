import { Router } from "express";
import verifyToken from "../../Users/Middleware/Verifytoken";
import validatorCookies from "../../Users/Middleware/ValidaterCookie";
import authorizeRole from "../../Users/Middleware/AuthorizeRole";
import resgisterPost from "../Controller/RegisterController";
import GetPostulacionAplicada from '../Controller/getController'
import cancelarPostulacion from "../Controller/cancelarPostulacion";
import getMisPostulaciones from '../Controller/ObtenerPostulacionVac'

const router = Router()

router.post('/RegisterPostulacion', verifyToken, validatorCookies, authorizeRole(['contratista', 'contratante_informal']), resgisterPost)
router.get('/getPostulacion', verifyToken, validatorCookies, authorizeRole(['contratista']), GetPostulacionAplicada)
router.get('/mis-postulaciones', verifyToken, validatorCookies, authorizeRole(['contratante_formal', 'contratante_informal']), getMisPostulaciones)
router.delete('/cancelar/:id', verifyToken, validatorCookies, authorizeRole(['contratista']), cancelarPostulacion )

export default router;				