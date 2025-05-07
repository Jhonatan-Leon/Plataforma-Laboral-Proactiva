import { Router } from "express";
import upload from "../Middleware/SubirFotoMiddleware";
import Subirfoto from "../Controllers/ControllerFoto";

const router = Router();

// Usa el middleware y el controlador
router.post("/subirfoto", upload.single("file"), Subirfoto);

export default router;
