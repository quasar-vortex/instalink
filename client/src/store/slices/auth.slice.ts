import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AuthState, UserPayload } from "../../types";

const mock_user = {
  id: "1234",
  firstName: "Billy",
  lastName: "Bob",
  email: "billybob@example.com",
  userName: "billy_bob_91",
  bio: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, delectus.`,
  avatarFileId: null,
  registeredDate: new Date().toISOString(),
  lastLoginDate: new Date().toISOString(),
};
const mockState: AuthState = { user: mock_user, accessToken: "" };

const initialState: AuthState = !import.meta.env.PROD
  ? mockState
  : { user: null, accessToken: null };

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
export const selectUserInfo = (state: RootState) => {
  const payload: Partial<AuthState["user"]> = {
    ...state.auth.user,
  };
  return payload;
};
export default authSlice.reducer;
