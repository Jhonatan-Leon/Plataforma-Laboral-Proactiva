import { Router } from "express";
import register from "../controllers/ControllersUser";
import { ValidatorUser } from "../Middleware/ValidaterUser";

const router = Router();

router.post('/RegisterUser', ValidatorUser, register);

 // router.get('/getUsers', );

export default router;