import express from "express";
import connectToDatabase from "./Videos/Config/Config-db";
import dotenv from "dotenv";
import RoutesVideo from "../src/Videos/Routes/RoutesVideo";

dotenv.config();

(async () => {
  await connectToDatabase();
})();


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())


app.use('/videos', RoutesVideo);




app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});