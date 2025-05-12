import multer from 'multer';

// Aquí decides dónde y cómo guardar los archivos. Puedes usar memoryStorage o diskStorage.
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

export default upload;