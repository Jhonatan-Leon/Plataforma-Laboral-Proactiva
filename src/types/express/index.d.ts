import { UserPayload } from '../../interfaces/UserPayload'; // o define aquí el tipo
import { TokenData } from '../../interfaces/TokenData'; // o define aquí el tipo

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
      tokenData?: TokenData;
    }
  }
}