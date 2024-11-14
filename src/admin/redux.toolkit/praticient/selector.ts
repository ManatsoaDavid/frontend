import { RootState } from "store/store";


// Sélecteur pour récupérer les praticiens
export const selectAllPraticiens = (state: RootState) => state.praticiens.users;

// Sélecteur pour l'état de chargement
export const selectPraticiensLoading = (state: RootState) => state.praticiens.loading;

// Sélecteur pour les erreurs
export const selectPraticiensError = (state: RootState) => state.praticiens.error;
