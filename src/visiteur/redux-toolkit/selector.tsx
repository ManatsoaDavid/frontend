
import { RootState } from "store/store";


// Sélecteur pour récupérer les praticiens
export const selectAllVisitor = (state: RootState) => state.visitor.visitors;

// Sélecteur pour l'état de chargement
export const selectVisitorLoading = (state: RootState) => state.visitor.loading;

// Sélecteur pour les erreurs
export const selectVisitorError = (state: RootState) => state.visitor.error;
