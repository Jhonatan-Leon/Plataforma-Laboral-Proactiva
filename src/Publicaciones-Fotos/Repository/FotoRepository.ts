import { GridFSBucket } from "mongodb";
import  connectToDatabase  from "../Config/Config-db";
import streamifier from "streamifier";

class FotoRepository {
  private static async getBucket(): Promise<GridFSBucket> {
    const { bucket } = await connectToDatabase();
    return bucket;
  }

  static async uploadFoto(file: Express.Multer.File): Promise<string> {
    console.log("Archivo recibido:", {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        bufferLength: file.buffer?.length,
    });
    const bucket = await this.getBucket();
    const readableStream = streamifier.createReadStream(file.buffer);
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      readableStream.pipe(uploadStream)
        .on("error", reject)
        .on("finish", () => resolve(uploadStream.id.toString()));
    });
  }
}

export default FotoRepository