import { Router } from "express";
import verifyToken from "../Middleware/Verifytoken";
import Controllersprofile from "../controllers/Controllersprofile";
import authorizeRole from "../Middleware/AuthorizeRole";
import validatorCookies from "../Middleware/ValidaterCookie";

const router = Router();

router.post('/profile', verifyToken, validatorCookies, authorizeRole(['contratista','contratante_formal', 'contratante_informal']) ,  Controllersprofile.profile)
router.post('/desactivarcuenta', verifyToken, validatorCookies, authorizeRole(['contratista','contratante_formal', 'contratante_informal']), Controllersprofile.deactivateUser)


export default router;