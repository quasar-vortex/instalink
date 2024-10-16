import { RootState } from "@/store/store";
import { AuthState, User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    removeUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;

export const selectIsSignedIn = (state: RootState) =>
  typeof state.auth.accessToken === "string";
