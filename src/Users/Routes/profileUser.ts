import { Router } from "express";
import verifyToken from "../Middleware/Verifytoken";
import Controllersprofile from "../controllers/Controllersprofile";
import validatorCookies from "../Middleware/ValidaterCookie";

const router = Router();

router.post('/profile', verifyToken, validatorCookies, Controllersprofile.profile)
router.post('/desactivarcuenta', verifyToken, Controllersprofile.deactivateUser)


export default router;