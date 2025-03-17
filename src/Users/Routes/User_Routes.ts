import { Router } from "express";
import { Users, getUsers } from "../controllers/ControllersUser";
import { ValidatorUser } from "../Middleware/ValidaterUser";

const router = Router();

router.post('/users', ValidatorUser, Users);

router.get('/getUsers', getUsers);

export default router;