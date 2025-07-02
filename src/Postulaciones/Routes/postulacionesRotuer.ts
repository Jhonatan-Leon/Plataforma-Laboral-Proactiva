import { Router } from "express";
import verifyToken from "../../Users/Middleware/Verifytoken";
import validatorCookies from "../../Users/Middleware/ValidaterCookie";
import authorizeRole from "../../Users/Middleware/AuthorizeRole";
import resgisterPost from "../Controller/RegisterController";
import GetPostulacionAplicada from '../Controller/getController'

const router = Router()

router.post('/RegisterPostulacion', verifyToken, validatorCookies, authorizeRole(['contratista', 'contratante_informal']), resgisterPost)
router.get('/getPostulacion', verifyToken, validatorCookies, authorizeRole(['contratista']), GetPostulacionAplicada)

export default router;			