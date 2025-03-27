import express from "express";
import bodyParser from 'body-parser';
import Register from "./Routes/Register";

import dotenv from "dotenv";

dotenv.config();

const app = express().use(bodyParser.json());

app.use('/vacant', Register)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});