import { Request, Response } from 'express';
import  sendToGemini  from '../Services/GeminiService';

const chatController = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;

  try {
    const reply = await sendToGemini(message);
    res.json({ reply });
  } catch (error: any) {
    console.error('Error en chatController:', error?.message || error);
    res.status(500).json({
      error: 'Error al comunicarse con Gemini',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined,
    });
  }
};
export default chatController;