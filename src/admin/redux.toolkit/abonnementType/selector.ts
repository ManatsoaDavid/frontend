import { RootState } from "store/store";


// Sélecteur pour récupérer les praticiens
export const selectsubscriptionType = (state: RootState) => state.subscriptionType.subscriptionTypes;

// Sélecteur pour l'état de chargement
export const selectsubscriptionTypeLoading = (state: RootState) => state.subscriptionType.loading;

// Sélecteur pour les erreurs
export const selectsubscriptionTypeError = (state: RootState) => state.subscriptionType.error;
