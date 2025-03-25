import express from "express";
import bodyParser from 'body-parser';
import User_Routes from './Users/Routes/User_Routes';

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/Users', User_Routes);




app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});