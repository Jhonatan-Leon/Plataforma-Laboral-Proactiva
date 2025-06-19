import { Router } from "express";
import {loginUser}  from "../controllers/loginController";
import ValidaterLogin from "../Middleware/ValidaterLogin";
import refreshToken  from "../controllers/ControllerrefreshToken";
import verifyToken from "../Middleware/Verifytoken";
import validatorCookies from "../Middleware/ValidaterCookie";
import { loginWithGoogle } from "../controllers/AuthController";


const router = Router();

router.post('/login_user', ValidaterLogin.validatorParams , ValidaterLogin.validator, loginUser)
router.post('/refresh',  refreshToken)
router.get('/auth/me', verifyToken, validatorCookies, (req, res) => {

	const {id, estado_perfil, rol} = req.tokenData;
	res.status(200).json(
		{id, estado_perfil, rol}
	);
	
});
router.post('/auth/google', loginWithGoogle) ;

export default router;