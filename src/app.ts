import express from "express";
import connectToDatabase from "./Publicaciones-Fotos/Config/Config-db";
import SubirFotoRute from "./Publicaciones-Fotos/Routes/SubirFotoRoute"

import dotenv from "dotenv";
dotenv.config();

(async () => {
  await connectToDatabase();
})();


const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())


app.use('/fotes', SubirFotoRute)




app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});