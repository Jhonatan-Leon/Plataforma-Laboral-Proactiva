import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

    const db = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT) || 5432,
        max: 10,
    })


  

db.connect()
    .then((client) => {
        console.log("Connected to PostgreSQL database!");
        client.release(); 
    })
    .catch((err: Error) => {
        console.error("Error connecting to database:", err);
    });

export default db