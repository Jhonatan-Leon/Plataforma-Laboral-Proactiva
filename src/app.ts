import express from "express";
import User_Routes from './Users/Routes/User_Routes';
import Register from "./Vacantes/Routes/Register"
import dotenv from "dotenv";
import Login_Routes from "./Users/Routes/Login_Routes"
import profileUser from "./Users/Routes/profileUser";
import cookieParser from 'cookie-parser';
import RegisterComent from './Comentarios/Routes/RegisterComent'
import cors from 'cors';
import postulacionRotuer from './Postulaciones/Routes/postulacionesRotuer'
import RoutesAI from './IA/Routes/RoutesAI'
import Contact_Route from './Users/Routes/Contact_Route'

dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8000',
  'https://plataforma-laboral-proactiva-web.onrender.com'
];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    console.log('Origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // permitir origen
    } else {  
      callback(new Error('Not allowed by CORS')); //NO USAR PARA PETICIONES DE ORIGEN CRUZADO
    }
  },

  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  
  credentials: true, // permitir cookies
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const PORT = process.env.PORT || 8000;    

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/Users', User_Routes);
app.use('/Users/login', Login_Routes);
app.use('/Users/Profile',  profileUser);
app.use('/User/Vacantes',  Register)
app.use('/comentarios',  RegisterComent)
app.use('/postulacion', postulacionRotuer);
app.use('/contact', Contact_Route);
app.use('/chat/IA', RoutesAI);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message); 
});