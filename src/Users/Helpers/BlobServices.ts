import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import dotenv from "dotenv";
import fs from 'fs';


dotenv.config();

const AZURE_STORAGE_CONNECTION = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const CONTAINER = process.env.CONTAINER_NAME || '';
const CONTENT = process.env.CONTENT_HOJA || '';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION);
const containerClient = blobServiceClient.getContainerClient(CONTAINER);
const containerHojaVida = blobServiceClient.getContainerClient(CONTENT);

// Limite de tamaño de archivo (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// Función para subir foto de perfil
export const subirFotoPerfil = async (file: any): Promise<string> => {
  let fileBuffer: Buffer;
  let mimetype = 'application/octet-stream';
  let extension = '.png'; // default
  let nombre = 'archivo.png'; // default

  // Verificar el tamaño del archivo antes de procesarlo
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('El archivo es demasiado grande. El tamaño máximo permitido es de 10 MB.');
  }

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
      console.error('Error al leer el archivo local:', error);
      throw new Error('Error al leer el archivo desde el sistema de archivos');
    }
  }

  else {
    throw new Error("Archivo inválido o tipo de archivo no soportado");
  }

  // Validar si es un archivo de imagen permitido
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validImageTypes.includes(mimetype)) {
    throw new Error('Formato de imagen no soportado. Solo se permiten JPG, PNG y GIF.');
  }

  const blobName = `${uuidv4()}${extension}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: {
        blobContentType: mimetype,
      },
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw new Error('Hubo un error al subir el archivo a Azure Blob Storage');
  }

  return blockBlobClient.url;
};

// Función para subir hoja de vida
export const subirHojaVida = async (file: any): Promise<string> => {
  let fileBuffer: Buffer;
  let mimetype = 'application/octet-stream';
  let extension = '.pdf'; // Extensión por defecto
  let nombre = 'documento.pdf'; // Nombre por defecto

  // Verificar el tamaño del archivo antes de procesarlo
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('El archivo es demasiado grande. El tamaño máximo permitido es de 10 MB.');
  }

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

    // Derivar la extensión según el tipo MIME
    const extMap: Record<string, string> = {
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    };
    extension = extMap[mimetype] || '.bin';
  }

  // Si es una ruta de archivo local
  else if (typeof file === 'string') {
    try {
      fileBuffer = fs.readFileSync(file);
      extension = path.extname(file);
    } catch (error) {
      console.error('Error al leer el archivo local:', error);
      throw new Error('Error al leer el archivo desde el sistema de archivos');
    }
  }

  else {
    throw new Error("Archivo inválido o tipo de archivo no soportado");
  }

  // Validar si es un archivo aceptable (PDF, Word, etc.)
  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!validTypes.includes(mimetype)) {
    throw new Error('Formato de archivo no soportado. Solo se permiten PDFs y documentos de Word.');
  }

  const blobName = `${uuidv4()}${extension}`;
  const blockBlobClient = containerHojaVida.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: {
        blobContentType: mimetype,
      },
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw new Error('Hubo un error al subir el archivo a Azure Blob Storage');
  }

  return blockBlobClient.url;
};