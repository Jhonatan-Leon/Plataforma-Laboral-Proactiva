import { GridFSBucket } from "mongodb";
import connectToDatabase from "../Config/Config-db";
import streamifier from "streamifier";

class VideoRepository {
  private static async getBucket(): Promise<GridFSBucket> {
    const { bucket } = await connectToDatabase();
    return bucket;
  }

  
  static async uploadVideo(file: Express.Multer.File): Promise<string> {
    console.log("Video recibido:", {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      bufferLength: file.buffer?.length,
    });

    // Verifica si el archivo es un video
    if (!file.mimetype.startsWith('video/')) {
      throw new Error("El archivo no es un video.");
    }

    const bucket = await this.getBucket();
    const readableStream = streamifier.createReadStream(file.buffer);
    
    // Creamos un flujo de subida para GridFS
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

export default VideoRepository;
