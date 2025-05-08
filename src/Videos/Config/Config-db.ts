import { MongoClient, Db, GridFSBucket } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_DATABASE || "PLP";

let db: Db;
let bucket: GridFSBucket;

const client = new MongoClient(uri);

async function connectToDatabase(): Promise<{db:Db, bucket: GridFSBucket}> {
    if (!db) {
        try {
            await client.connect();
            db = client.db(dbName);
            bucket = new GridFSBucket(db, {bucketName: 'uploads'});
            console.log("Connected to MongoDB database y GridFS listo");
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            throw err;
        }
    }
    return { db, bucket};
}

export default connectToDatabase;
