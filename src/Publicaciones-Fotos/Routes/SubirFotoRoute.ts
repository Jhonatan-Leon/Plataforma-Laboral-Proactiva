import { Router } from "express";
import upload from "../Middleware/SubirFotoMiddleware";
import Subirfoto from "../Controllers/ControllerFoto";
import EliminarFoto from "../Controllers/ControllerEliminarFoto";
import getFoto  from "../Controllers/ControllerObtenerFoto"
const router = Router();

// Usa el middleware y el controlador
router.post("/subirfoto", upload.single("file"), Subirfoto);
router.delete("/eliminarfoto/:fileId", EliminarFoto);
router.get("/consultarfoto/:fileId",getFoto );

export default router;
