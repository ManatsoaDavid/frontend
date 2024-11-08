import axios from 'axios';
import { localStorageService } from 'utils/localStorageService';


// Création d'une instance axios avec une configuration de base
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes sortantes
axiosInstance.interceptors.request.use(
  (config) => {
    // Récupération des informations de l'utilisateur depuis le localStorage
    const user = localStorageService.getItem('user');
    if (user?.access_token) {
      config.headers['Authorization'] = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses entrantes
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.error('Non autorisé, redirection vers la page de connexion.');
        window.location.href = '/#/login';
      }
      return Promise.reject({
        message: error.response.data?.message || 'Une erreur est survenue',
        status: status,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
