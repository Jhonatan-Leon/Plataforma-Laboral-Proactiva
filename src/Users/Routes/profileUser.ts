import { Router } from "express";
import verifyToken from "../Middleware/Verifytoken";
import Controllersprofile from "../controllers/Controllersprofile";
import validatorCookies from "../Middleware/ValidaterCookie";
import authorizeRole from "../Middleware/AuthorizeRole";

const router = Router();

router.post('/profile', authorizeRole(['Contratista','Contratante']), verifyToken, validatorCookies, Controllersprofile.profile)
router.post('/desactivarcuenta', verifyToken, Controllersprofile.deactivateUser)


export default router;