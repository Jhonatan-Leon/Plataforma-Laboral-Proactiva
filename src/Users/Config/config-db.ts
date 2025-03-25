import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();


console.log({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT
});


const db = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Confirmar conexión a base de datos
db.getConnection(( err, Connection) => {
    if(err) {
        console.log("Erro Conecting: ", err);
    }else {
        console.log("Conected to database: ");
        Connection.release();
    }
});

export default db.promise();