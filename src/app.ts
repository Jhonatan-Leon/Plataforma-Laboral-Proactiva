import express from "express";
import User_Routes from './Users/Routes/User_Routes';
import dotenv from "dotenv";
import Login_Routes from "./Users/Routes/Login_Routes"
import profileUser from "./Users/Routes/profileUser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/Users', User_Routes);
app.use('/login', Login_Routes);
app.use('/Profile', profileUser);



app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});