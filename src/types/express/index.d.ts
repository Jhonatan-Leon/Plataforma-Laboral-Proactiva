import { UserPayload } from '../../interfaces/UserPayload'; // o define aquí el tipo

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}