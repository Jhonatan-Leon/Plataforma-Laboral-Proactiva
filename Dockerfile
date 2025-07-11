# Paso 1: Imagen base liviana de Node.js
FROM node:18-alpine

# Paso 2: Establecer directorio de trabajo
WORKDIR /app

# Paso 3: Copiar y instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Paso 4: Copiar el resto del código (sin .env)
COPY . .

# Paso 5: Compilar TypeScript
RUN npm run build

# Paso 6: Exponer el puerto
EXPOSE 3000

# Paso 7: Comando de arranque
CMD ["node", "dist/index.js"]