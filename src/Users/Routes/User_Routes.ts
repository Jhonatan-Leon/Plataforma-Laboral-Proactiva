import { Router } from "express";
import register from "../controllers/ControllersUser";
import { ValidatorUser } from "../Middleware/ValidaterUser";
import { ValidatorOpcional } from "../Middleware/ValidaterOpcional";
import {getUserById, getByRol} from "../controllers/GetControllers";
import { updateUser } from "../controllers/updateControllers";
import validatorupdate from "../Middleware/validatorupdate"
import { deleteUserByEmail } from "../controllers/Controllersdelete";
import authorizeRole from "../Middleware/AuthorizeRole";

const router = Router();

router.post('/RegisterUser', ValidatorUser, ValidatorOpcional, register);
router.get('/getUser/:id',getUserById);
router.get('/getRol/:tipo_usuario', getByRol)
router.put('/updateUser/:email', validatorupdate.validatorEmail, validatorupdate.validateUpdateUser, updateUser)
router.delete('/deleteUser/:email',  deleteUserByEmail );

export default router;