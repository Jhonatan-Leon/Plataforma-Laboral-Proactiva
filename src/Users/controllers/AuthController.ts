// controllers/authController.ts
import { Request, Response } from 'express'
import { verifyGoogleIdToken } from '../Helpers/GooogleAuthServices'
import generateToken from '../Helpers/generateTokens'
import UserService from '../Services/UserServices'

export const loginWithGoogle = async (req: Request, res: Response) => {
  const { id_token } = req.body

  console.log('ID Token recibido:', id_token)

  if (!id_token) {
    res.status(400).json({ message: 'Falta id_token' })
	return;
  }

  try {
    const googleUser = await verifyGoogleIdToken(id_token)

    // Buscar o crear usuario
    const login = await UserService.loginWithGoogle(googleUser.email);

	if (!login.logged) {
 		res.status(404).json({ message: login.status });
		return;
	}


     const secretKey = process.env.KEY_TOKEN;
        const refreshSecret = process.env.REFRESH_KEY_TOKEN;
        if (!secretKey || !refreshSecret) {
            throw new Error("Las claves KEY_TOKEN o REFRESH_KEY_TOKEN no están definidas");
        }

        const accessToken = generateToken(
            { id: login.id, estado_perfil: login.estado_perfil, rol: login.rol }, 
            secretKey, 
            1
        );

        // Refresh por 7 dias
        const refreshToken = generateToken(
             {id: login.id, estado_perfil: login.estado_perfil, rol: login.rol} , 
            refreshSecret, 
            7 * 24 * 60 
        );

        // Guardar refreshToken en cookie
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true,  
            secure: true,    
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: "localhost",
            path: '/'
           
        });

    res.status(200).json({
      message: login.status,
      token: accessToken,
      user: {
        id: login.id,
        estado_perfil: login.estado_perfil,
        rol: login.rol
      }
    });
  } catch (error) {
    console.error(' Error login con Google:', error)
    res.status(401).json({ message: 'Token inválido' })
	return;
  }
}
