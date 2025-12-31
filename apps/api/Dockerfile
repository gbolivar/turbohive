# Imagen base
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y lock
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el código
COPY . .

# Compilamos NestJS
RUN npm run build

# Comando de arranque
CMD ["npm", "run", "start:prod"]
