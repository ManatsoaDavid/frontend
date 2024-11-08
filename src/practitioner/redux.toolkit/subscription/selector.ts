import { RootState } from "store/store";

// Selector to get all subscriptions
export const selectSubscriptions = (state: RootState) => state.subscription.subscriptions;

// Selector for loading state
export const selectSubscriptionLoading = (state: RootState) => state.subscription.loading;

// Selector for error state
export const selectSubscriptionError = (state: RootState) => state.subscription.error;
