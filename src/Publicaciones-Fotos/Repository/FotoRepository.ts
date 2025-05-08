import { GridFSBucket, ObjectId } from "mongodb";
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
  static async eliminarFoto(fileId: string): Promise<string> {
    try {
      const bucket = await this.getBucket();
      
      // Convertimos el id de archivo a ObjectId
      const fileObjectId = new ObjectId(fileId);

      // Intentamos eliminar el archivo de GridFS
      await bucket.delete(fileObjectId);

      // Si no hubo errores, el archivo fue eliminado
      return `Archivo con ID ${fileId} eliminado exitosamente.`;
    } catch (error: any) {
      // Si el archivo no existe, el error será capturado aquí.
      if (error.message.includes('no such file')) {
        return `No se encontró un archivo con el ID ${fileId}.`;
      }
      
      console.error("Error al eliminar el archivo:", error);
      throw new Error("Hubo un problema al intentar eliminar el archivo.");
    }
  }

}

export default FotoRepository