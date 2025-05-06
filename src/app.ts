import express from "express";
import User_Routes from './Users/Routes/User_Routes';
import bodyParser from 'body-parser';
import Register from "./Routes/Register";
import dotenv from "dotenv";
import Login_Routes from "./Users/Routes/Login_Routes"
import profileUser from "./Users/Routes/profileUser";
import cookieParser from 'cookie-parser';
import RegisterComent from "../src/Comentarios/Routes/RegisterComent"


dotenv.config();

const app = express().use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json())

app.use('/Users', User_Routes);
app.use('/login', Login_Routes);
app.use('/Profile', profileUser);
app.use('/vacant', Register)
app.use('/coment', RegisterComent)

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});