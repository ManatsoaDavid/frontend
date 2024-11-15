# Utiliser l'image Node.js officielle pour construire et exécuter le frontend React
FROM node:20-alpine

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json package-lock.json tsconfig.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers source dans le conteneur
COPY . .

# Exposer le port sur lequel votre application écoute
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
