import { Router } from "express";
import supportPLP from "../controllers/ControllerContact";
import { supportValidator } from "../Middleware/supportValitdator";

const router = Router();

router.post('/support', supportValidator, supportPLP);

export default router;