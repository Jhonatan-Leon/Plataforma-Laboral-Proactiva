import { Router } from "express";
import {loginUser}  from "../controllers/loginController";
import ValidaterLogin from "../Middleware/ValidaterLogin";



const router = Router();

router.post('/login_user', ValidaterLogin.validatorParams , ValidaterLogin.validator, loginUser)



export default router;