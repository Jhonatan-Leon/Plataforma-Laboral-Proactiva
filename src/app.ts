import express from "express";
import User_Routes from './Users/Routes/User_Routes';
import bodyParser from 'body-parser';
import Register from "./Vacantes/Routes/Register"
import dotenv from "dotenv";
import Login_Routes from "./Users/Routes/Login_Routes"
import profileUser from "./Users/Routes/profileUser";
import cookieParser from 'cookie-parser';
import RegisterComent from './Comentarios/Routes/RegisterComent'
import authorizeRole from './Users/Middleware/AuthorizeRole'
import cors from 'cors';

dotenv.config();

const app = express().use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Ruta de frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // permitir cookies
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())

app.use('/Users', User_Routes);
app.use('/Users/login', Login_Routes);
app.use('/Users/Profile',  profileUser);
app.use('/Vacantes',  Register)
app.use('/comentarios',  RegisterComent)

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});