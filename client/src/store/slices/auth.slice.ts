import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AuthState, UserPayload } from "../../types";

const initialState: AuthState = { user: null, accessToken: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayload>) => {
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
export const selectIsLoggedIn = (state: RootState) =>
  state.auth.accessToken !== null && state.auth.user !== null;
export const selectAvatarInfo = (state: RootState) => {
  const payload: Partial<AuthState["user"]> = {
    ...state.auth.user,
  };
  return payload;
};
export default authSlice.reducer;
