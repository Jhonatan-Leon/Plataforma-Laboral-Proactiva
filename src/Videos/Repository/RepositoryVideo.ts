import { GridFSBucket, ObjectId } from "mongodb";
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
  static async eliminarVideo(fileId: string): Promise<string> {
    try {
      const bucket = await this.getBucket();
      const objectId = new ObjectId(fileId);
      await bucket.delete(objectId);
      return `Video con ID ${fileId} eliminado correctamente.`;
    } catch (error: any) {
      if (error.message.includes('no such file')) {
        return `No se encontró un video con el ID ${fileId}.`;
      }

      console.error('Error al eliminar el video:', error);
      throw new Error('Hubo un problema al intentar eliminar el video.');
    }
  }
  static async ObtenerVideo(fileId:string): Promise<string>{
    try{
      const bucket = await this.getBucket();
      const objectId = new ObjectId(fileId);
      await bucket.find({ _id: objectId });
      return `Video con ID ${fileId} obtenido correctamente`
    }catch(error:any){
      if(error.message.includes('no usch file')){
        return `No se encontró un video con el ID ${fileId}.`
      }
      console.error('Error al obtener el video:', error);
      throw new Error('Hubo un problema al intentar obtener el video.');
    }
  }
}

export default VideoRepository;
