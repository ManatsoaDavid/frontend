import { configureStore } from "@reduxjs/toolkit";
import userSlice from "user/redux.toolkit/register/reducer";
import subscriptionCycleSlice from "../admin/redux.toolkit/abonnementCycle/reducer";
import subscriptionTypeSlice from "../admin/redux.toolkit/abonnementType/reducer";
import adminSlice from "../admin/redux.toolkit/loginAdmin/reducer";
import praticienSlice from "../admin/redux.toolkit/praticient/reducer";
import appointmentSlice from '../practitioner/redux.toolkit/appointment/reducer';
import practitionerSlice from '../practitioner/redux.toolkit/reducer';
import subscriptionSlice from "../practitioner/redux.toolkit/subscription/reducer";
import publicPraticientSlice from "../public/redux.toolkit/praticient/reducer";
import publicSlice from "../public/redux.toolkit/visiteur/reducer";
import visitorSlice from "../visiteur/redux-toolkit/reducer";

export const store = configureStore({
  reducer: {
    praticiens: praticienSlice,
    admin: adminSlice,
    public: publicSlice,
    user: userSlice,
    publicPraticiens: publicPraticientSlice,
    visitor: visitorSlice,
    practitioners: practitionerSlice,
    appointment: appointmentSlice,
    subscriptionType: subscriptionTypeSlice,
    subscriptionCycle: subscriptionCycleSlice,
    subscription: subscriptionSlice,
  },
});

// Types pour l'état global et le dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
