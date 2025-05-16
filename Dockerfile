# Paso 1: Seleccionar la imagen base
FROM node:18-alpine

# Paso 2: Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Paso 3: Copiar los archivos de definición de dependencias
# Esto permite que Docker cachee la capa de npm install si package.json no cambia
COPY package.json package-lock.json ./
COPY .env .env

# Paso 4: Instalar las dependencias de producción
RUN npm install


# Paso 5: Copiar el resto del código de la aplicación (incluyendo los archivos TypeScript)
COPY . .

# Paso 6: Compilar el código TypeScript a JavaScript (importante para producción)
# Asegúrate de que tu package.json tenga un script "build" que haga esto (ej. "tsc")
RUN npm run build

# Paso 7: Exponer el puerto real en el que tu aplicación Node.js escucha
# ¡Ajusta este puerto al que tu aplicación Node.js realmente usa!
EXPOSE 5432

# Paso 8: Comando para iniciar la aplicación compilada cuando el contenedor se ejecute
# Ejecuta el archivo JavaScript compilado (normalmente en el directorio 'dist')
CMD ["node", "dist/app.js"]