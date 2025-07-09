import { Router } from "express";
import verifyToken from "../../Users/Middleware/Verifytoken";
import validatorCookies from "../../Users/Middleware/ValidaterCookie";
import authorizeRole from "../../Users/Middleware/AuthorizeRole";
import resgisterPost from "../Controller/RegisterController";
import GetPostulacionAplicada from '../Controller/getController'
import cancelarPostulacion from "../Controller/cancelarPostulacion";
import getMisPostulaciones from '../Controller/ObtenerPostulacionVac'
import patchStatus from '../Controller/updateStatus'

const 	router = Router()

router.post('/RegisterPostulacion', verifyToken, validatorCookies, authorizeRole(['contratista', 'contratante_informal']), resgisterPost)
router.get('/getPostulacion', verifyToken, validatorCookies, authorizeRole(['contratista']), GetPostulacionAplicada)
router.get('/mis-postulaciones', verifyToken, validatorCookies, authorizeRole(['contratante_formal', 'contratante_informal']), getMisPostulaciones)
router.delete('/cancelar/:id', verifyToken, validatorCookies, authorizeRole(['contratista']), cancelarPostulacion )
router.put('/updateStatus/:id', verifyToken, validatorCookies, authorizeRole(['contratante_formal', 'contratante_informal']), patchStatus)

export default router;				