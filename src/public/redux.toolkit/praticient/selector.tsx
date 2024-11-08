import { RootState } from "store/store";

export const selectAllPublicPraticient = (state: RootState) => state.publicPraticiens.praticient;

export const selectPublicPraticientLoading = (state: RootState) => state.publicPraticiens.loading;

export const selectPublicPraticientError = (state: RootState) => state.publicPraticiens.error;
