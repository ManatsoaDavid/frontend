# Utiliser l'image Node.js officielle pour construire le frontend React
FROM node:20-alpine AS build

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json package-lock.json tsconfig.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers source dans le conteneur
COPY . .

# Construire l'application en mode production
RUN npm run build

# Utiliser une image Nginx pour servir l'application construite
FROM nginx:stable-alpine

# Copier les fichiers de construction dans le répertoire par défaut de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour le frontend
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]