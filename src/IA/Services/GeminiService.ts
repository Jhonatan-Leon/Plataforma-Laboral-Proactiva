import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({model: 'models/gemini-1.5-flash'});


async function sendToGemini(message: string): Promise<string> {
  const result = await model.generateContent([message]);
  const response = await result.response;
  return response.text();
}
export default sendToGemini