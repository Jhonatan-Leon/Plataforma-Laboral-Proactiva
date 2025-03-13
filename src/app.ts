import express from "express";
import bodyParser from 'body-parser';


import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())


app.get('/', (req, res) => {
    res.send(`Servidor Corriendo en el puerto: ${PORT}`)
})




app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});