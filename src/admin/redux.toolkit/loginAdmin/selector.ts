import { RootState } from "store/store";

export const selectAdminToken = (state: RootState) => state.admin.token;
export const selectAdminLoading = (state: RootState) => state.admin.loading;
export const selectAdminError = (state: RootState) => state.admin.error;
