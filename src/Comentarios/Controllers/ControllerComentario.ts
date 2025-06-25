import { Request, Response } from "express";
import Comentario from "../Dto/ComentarioDto";
import ServiceComent from "../Services/ComentService";

const Registrar = async (req: Request, res: Response) => {
  try {
    /* 1. Extrae y valida el cuerpo */
    const user = req.user;

    const {
      target_user_id,
      content,
      fecha_creacion
    } = req.body;

    const author_id = user?.data?.id;

    if (!author_id || !target_user_id || !content?.trim()) {
       res.status(400).json({ error: 'author_id, target_user_id y content son obligatorios' });
       return;
    }

    /* 3. Usa el servicio para almacenarlo */
    const saved = await ServiceComent.AddComent(new Comentario(fecha_creacion, content, author_id, target_user_id));

     res.status(201).json({
      message: 'Comentario registrado',
      comentario: saved       
    });
  } catch (error: any) {
    /* 5. Manejo de errores */
    if (error?.code === 'ER_DUP_ENTRY') {
       res.status(409).json({ error: 'Comentario duplicado' });
       return;
    }
    console.error('[Registrar comentario] ', error);
     res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default Registrar;