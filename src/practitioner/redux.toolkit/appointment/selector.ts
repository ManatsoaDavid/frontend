import { RootState } from "store/store";


// Sélecteur pour récupérer les praticiens
export const selectAppointment = (state: RootState) => state.appointment.appointments;

// Sélecteur pour l'état de chargement
export const selectAppointmentLoading = (state: RootState) => state.appointment.loading;

// Sélecteur pour les erreurs
export const selectAppointmentError = (state: RootState) => state.appointment.error;
