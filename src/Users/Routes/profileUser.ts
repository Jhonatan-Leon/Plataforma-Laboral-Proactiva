import { Router } from "express";
import verifyToken from "../Middleware/Verifytoken";
import Controllersprofile from "../controllers/Controllersprofile";


const router = Router();

router.post('/profile', verifyToken,  Controllersprofile.profile)
router.post('/desactivarcuenta', verifyToken, Controllersprofile.deactivateUser)


export default router;