import { Router } from "express";
import verifyToken from "../Middleware/Verifytoken";
import Controllersprofile from "../controllers/Controllersprofile";
import authorizeRole from "../Middleware/AuthorizeRole";
import validatorCookies from "../Middleware/ValidaterCookie";
import { logout } from "../controllers/loginController";
import changePassword from "../controllers/ControllerChangePassword";
import  {validateChangePasswordBody}  from "../Middleware/validatedChangePassword";

const router = Router();

router.get('/', verifyToken, validatorCookies, authorizeRole(['contratista','contratante_formal', 'contratante_informal']) ,  Controllersprofile.profile)
router.put('/desactivarcuenta', verifyToken, validatorCookies, authorizeRole(['contratista','contratante_formal', 'contratante_informal']), Controllersprofile.deactivateUser)
router.post('/logout', logout);
router.put('/updatePassword', verifyToken, validatorCookies, authorizeRole(['contratista','contratante_formal', 'contratante_informal']), validateChangePasswordBody, changePassword);

export default router;