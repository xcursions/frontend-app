import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { adminApi } from "@/services/admin";
import { authApi } from "@/services/auth";
import { userApi } from "@/services/user";
import { savingPlanApi } from "@/services/user/savingPlan";

import { publicApi } from "../services/public";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,

    // Generated Reducers from API
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [savingPlanApi.reducerPath]: savingPlanApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      savingPlanApi.middleware,
      adminApi.middleware,
      publicApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
