import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import dotenv from "dotenv";
import fs from 'fs';


dotenv.config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
const CONTAINER = process.env.CONTAINER_NAME || 'fotos'; 

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(CONTAINER);

export const subirFotoPerfil = async (file: any ): Promise<string> => {
  let fileBuffer: Buffer;

  // Si 'file' es un objeto de tipo Multer (contiene buffer), usarlo directamente
  if (file instanceof Object && 'buffer' in file) {
    fileBuffer = file.buffer;
  } 
  // Si 'file' es un string (path), leer el archivo desde el sistema de archivos
  else if (typeof file === 'string') {
    try {
      fileBuffer = fs.readFileSync(file); // Leer archivo desde el path
    } catch (error) {
      throw new Error("Error al leer el archivo desde el sistema de archivos");
    }
  } else {
    throw new Error("Archivo inválido o tipo de archivo no soportado");
  }

  // Si no se obtuvo un buffer, lanzar error
  if (!fileBuffer) {
    throw new Error("Archivo inválido o vacío");
  }

  // Definir el nombre del archivo y su extensión
  const extension = path.extname(file instanceof Object ? file.originalname : file);
  const blobName = `${uuidv4()}${extension}`;
  
  // Subir el archivo a Azure Blob Storage
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: file instanceof Object ? file.mimetype : 'application/octet-stream', // Ajustar el tipo MIME si es necesario
    },
  });

  return blockBlobClient.url; // Retornar la URL del archivo subido
};