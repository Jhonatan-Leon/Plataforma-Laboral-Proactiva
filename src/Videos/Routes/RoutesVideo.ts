import { Router } from "express";
import upload from "../Middleware/MiddlewareVideo";
import SubirVideo from "../Controller/ControllerVideo";
import eliminarVideo from "../Controller/ControllerEliminarVideo";
import obtenervideo from "../Controller/ControllerObtenerVideo";

const router = Router();


router.post("/subirvideo", upload.single("file"), SubirVideo);  
router.delete("/eliminarvideo/:fileId", eliminarVideo);  
router.get("/obtenervideo/:fileId", obtenervideo)
export default router;
