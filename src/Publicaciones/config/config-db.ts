import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_DATABASE || "PLP";

let db: Db;

const client = new MongoClient(uri);

async function connectToDatabase(): Promise<Db> {
    if (!db) {
        try {
            await client.connect();
            db = client.db(dbName);
            console.log("Connected to MongoDB database!");
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            throw err;
        }
    }
    return db;
}

export default connectToDatabase;
