import { Request, Response } from 'express';
import  {sendToGemini}  from '../Services/GeminiService';

const chatController = async (req: Request, res: Response) => {
  const { message } = req.body;
  try {
      const reply = await sendToGemini(message);
      res.json({ reply });
      return;
  } catch (err: any) {
      console.error('chatController error:', err);
      res.status(500).json({ error: 'Error al comunicarse con Gemini' });
      return;
  }
};
export default chatController;