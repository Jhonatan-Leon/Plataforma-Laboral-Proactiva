import multer from "multer";

const storage = multer.memoryStorage(); //Define que los archivos subidos se almacenen en memoria

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limita a 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Solo se permiten archivos de imagen"));
    }
    cb(null, true);
  },
});

export default upload;