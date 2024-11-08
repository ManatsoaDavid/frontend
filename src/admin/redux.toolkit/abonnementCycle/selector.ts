import { RootState } from "store/store";

// Selector to get all subscription cycles
export const selectSubscriptionCycles = (state: RootState) => state.subscriptionCycle.subscriptionCycles;

// Selector for loading state
export const selectSubscriptionCycleLoading = (state: RootState) => state.subscriptionCycle.loading;

// Selector for error state
export const selectSubscriptionCycleError = (state: RootState) => state.subscriptionCycle.error;
