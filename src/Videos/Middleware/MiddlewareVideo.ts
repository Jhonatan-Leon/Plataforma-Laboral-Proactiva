import multer from "multer";

// Definir que los archivos subidos se almacenen en memoria
const storage = multer.memoryStorage();

// Configuración de Multer para aceptar videos
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Limita a 100MB
  },
  fileFilter: (req, file, cb) => {
    console.log(file);  // Aquí puedes verificar si el archivo se está recibiendo
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Solo se permiten archivos de video"));
    }
    cb(null, true);  // Si el archivo es válido, continuar
  },
});


export default upload;
