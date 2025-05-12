import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import dotenv from "dotenv";
import fs from 'fs';


dotenv.config();

const AZURE_STORAGE_CONNECTION = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
const CONTAINER = process.env.CONTAINER_NAME || ''; 
const CONTENT = process.env.CONTENT_HOJA || '';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION);
const containerClient = blobServiceClient.getContainerClient(CONTAINER);

export const subirFotoPerfil = async (file: any): Promise<string> => {
  let fileBuffer: Buffer;
  let mimetype = 'application/octet-stream';
  let extension = '.png'; // default
  let nombre = 'archivo.png'; // default

  // Si es un objeto tipo Multer (buffer en memoria)
  if (file && typeof file === 'object' && 'buffer' in file && 'originalname' in file) {
    fileBuffer = file.buffer;
    mimetype = file.mimetype;
    extension = path.extname(file.originalname);
    nombre = file.originalname;
  }

  // Si es una cadena base64
  else if (typeof file === 'string' && file.startsWith('data:')) {
    const matches = file.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error('Formato base64 inválido');

    mimetype = matches[1];
    fileBuffer = Buffer.from(matches[2], 'base64');

    // Derivar extensión del mimetype
    const extMap: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
    };
    extension = extMap[mimetype] || '.bin';
  }

  // Si es una ruta de archivo local
  else if (typeof file === 'string') {
    try {
      fileBuffer = fs.readFileSync(file);
      extension = path.extname(file);
    } catch (error) {
      throw new Error("Error al leer el archivo desde el sistema de archivos");
    }
  }

  else {
    throw new Error("Archivo inválido o tipo de archivo no soportado");
  }

  const blobName = `${uuidv4()}${extension}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: mimetype,
    },
  });

  return blockBlobClient.url;
};

const containerHojaVida = blobServiceClient.getContainerClient(CONTENT)

export const subirHojaVida = async (file: any): Promise<string> => {
  let fileBuffer: Buffer;
  let mimetype = 'application/octet-stream'; // Tipo por defecto
  let extension = '.pdf'; // Extensión por defecto
  let nombre = 'documento.pdf'; // Nombre por defecto

  // Si es un objeto tipo Multer (buffer en memoria)
  if (file && typeof file === 'object' && 'buffer' in file && 'originalname' in file) {
    fileBuffer = file.buffer; // Asignar el buffer del archivo
    mimetype = file.mimetype; // Asignar el tipo MIME
    extension = path.extname(file.originalname); // Obtener la extensión del archivo
    nombre = file.originalname; // Obtener el nombre original del archivo
  }
  // Si es una cadena base64
  else if (typeof file === 'string' && file.startsWith('data:')) {
    const matches = file.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error('Formato base64 inválido');

    mimetype = matches[1];
    fileBuffer = Buffer.from(matches[2], 'base64'); // Convertir la cadena base64 en un buffer

    // Derivar la extensión según el tipo MIME
    const extMap: Record<string, string> = {
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    };
    extension = extMap[mimetype] || '.bin'; // Asignar extensión predeterminada si el MIME no coincide
  }

  // Si es una ruta de archivo local
  else if (typeof file === 'string') {
    try {
      fileBuffer = fs.readFileSync(file); // Leer el archivo desde el sistema de archivos
      extension = path.extname(file); // Obtener la extensión del archivo
    } catch (error) {
      throw new Error("Error al leer el archivo desde el sistema de archivos");
    }
  }
  // Si el archivo no es válido
  else {
    throw new Error("Archivo inválido o tipo de archivo no soportado");
  }

  // Validar si es un archivo aceptable (PDF, Word, etc.)
  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!validTypes.includes(mimetype)) {
    throw new Error('Formato de archivo no soportado. Solo se permiten PDFs y documentos de Word.');
  }

  // Generar nombre único para el archivo en Azure Blob Storage
  const blobName = `${uuidv4()}${extension}`;
  const blockBlobClient = containerHojaVida.getBlockBlobClient(blobName);

  // Subir el archivo a Azure Blob Storage
  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: mimetype, 
    },
  });

  // Retornar la URL 
  return blockBlobClient.url;
};