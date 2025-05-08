import { Router } from "express";
import upload from "../Middleware/MiddlewareVideo";
import SubirVideo from "../Controller/ControllerVideo";

const router = Router();

// Ruta para subir el video
router.post("/subirvideo", upload.single("file"), SubirVideo);  // El campo se llama 'file'

export default router;
