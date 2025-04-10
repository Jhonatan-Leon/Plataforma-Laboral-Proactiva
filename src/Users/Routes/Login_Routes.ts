import { Router } from "express";
import {loginUser}  from "../controllers/loginController";
import ValidaterLogin from "../Middleware/ValidaterLogin";
import refreshToken  from "../controllers/ControllerrefreshToken";
import verifyToken from "../Middleware/Verifytoken";


const router = Router();

router.post('/login_user', ValidaterLogin.validatorParams , ValidaterLogin.validator, loginUser)
router.post('/refresh', verifyToken , refreshToken)


export default router;