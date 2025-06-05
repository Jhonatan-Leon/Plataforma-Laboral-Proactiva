import { Request, Response, NextFunction } from 'express'

const validateCreationVacant = (req: Request, res: Response, next: NextFunction) => {
  const {
    nombre_vacante,
    personal_contacto,
    forma_contacto,
    ubicacion_vacante,
    descripcion_vacante,
    logo,
    salario,
    disponibilidad,
    categoria_trabajo
  } = req.body

  const fotoP = req.file;

  console.log(nombre_vacante, personal_contacto, forma_contacto, ubicacion_vacante, descripcion_vacante, logo, salario, disponibilidad, categoria_trabajo)

  // Validación de campos obligatorios
  const requiredFields = [
    'nombre_vacante',
    'personal_contacto',
    'forma_contacto',
    'ubicacion_vacante',
    'descripcion_vacante',
    'salario',
    'disponibilidad',
    'categoria_trabajo',
  ]

  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).json({ error: `El campo '${field}' es obligatorio.` })
      return;
    }
  }

  if (fotoP) {
        req.body.logo = `data:${fotoP.mimetype};base64,${fotoP.buffer.toString('base64')}`;
    } else {
        req.body.logo = null;
    }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const phoneRegex = /^(3\d{9}|[1-9]\d{6})$/;

  if (emailRegex.test(forma_contacto)) {
    console.log('Es un correo válido');
  } else if (phoneRegex.test(forma_contacto)) {
    console.log('Es un número válido');
  } else {
    console.log('Formato no válido');
  }

  next()
}

export default validateCreationVacant