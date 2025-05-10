import { Router } from "express";
import verifyToken from "../Middleware/Verifytoken";
import Controllersprofile from "../controllers/Controllersprofile";
import authorizeRole from "../Middleware/AuthorizeRole";
import validatorCookies from "../Middleware/ValidaterCookie";

const router = Router();

router.post('/profile', verifyToken, validatorCookies,  authorizeRole(['Contratista','Contratante']) ,  Controllersprofile.profile)
router.post('/desactivarcuenta', verifyToken, Controllersprofile.deactivateUser)


export default router;