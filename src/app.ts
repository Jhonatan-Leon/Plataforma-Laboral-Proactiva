import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import RegisterComent from "../src/Comentarios/Routes/RegisterComent"
dotenv.config();

const app = express().use(bodyParser.json());

app.use('/coment', RegisterComent)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});