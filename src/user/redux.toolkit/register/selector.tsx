import { RootState } from "store/store";


export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectError = (state: RootState) => state.user.error;
