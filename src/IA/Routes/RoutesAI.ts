import { Router } from 'express';
import  chatController  from '../Controllers/ChatController';
import validateMessage from '../Middleware/middlewareIA';

const router = Router();

router.post('/', validateMessage, chatController);

export default router;
