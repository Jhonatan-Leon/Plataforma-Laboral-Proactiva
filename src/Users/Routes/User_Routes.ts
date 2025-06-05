import { Router } from "express";
import register from "../controllers/ControllersUser";
import { ValidatorUser } from "../Middleware/ValidaterUser";
import { ValidatorOpcional } from "../Middleware/ValidaterOpcional";
import {getUserById, getByRol} from "../controllers/GetControllers";
import { updateUser } from "../controllers/updateControllers";
import validatorupdate from "../Middleware/validatorupdate"
import { deleteUser } from "../controllers/Controllersdelete";
import authorizeRole from "../Middleware/AuthorizeRole";
import validatorCookies from "../Middleware/ValidaterCookie";
import verifyToken from "../Middleware/Verifytoken";
import upload from "../Helpers/Upload";

const router = Router();

router.post('/RegisterUser', upload.single('fotoPerfil'), ValidatorUser, register);
router.get('/getUser/:id',verifyToken, validatorCookies, getUserById);
router.get('/getRol/:tipo_usuario', getByRol)
router.put('/updateUser/:email', upload.single('fotoPerfil'), verifyToken,validatorCookies,authorizeRole(['contratista','contratante_formal', 'contratante_informal']),validatorupdate.validatorEmail,validatorupdate.validateUpdateUser,updateUser);
router.delete('/deleteUser/:email',  verifyToken, validatorCookies, authorizeRole(['Contratista', 'Contratante']), deleteUser );

export default router;