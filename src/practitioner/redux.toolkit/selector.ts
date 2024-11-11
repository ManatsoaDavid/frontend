import { RootState } from "store/store";


export const selectPractitioner = (state: RootState) => state.practitioners.practitioner;
export const selectPractitionerLoading = (state: RootState) => state.practitioners.loading;
export const selectPractitionerError = (state: RootState) => state.practitioners.error;
export const selectAllPractitioners = (state: RootState) => state.practitioners.practitioners;

