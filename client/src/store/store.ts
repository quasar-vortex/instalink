import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "@/api/auth/authApi";

export const store = configureStore({
  reducer: { auth: authReducer, [authApi.reducerPath]: authApi.reducer },
  middleware: (gDefault) => gDefault().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred types: {auth: AuthState, friends: FriendsState }
export type AppDispatch = typeof store.dispatch;
