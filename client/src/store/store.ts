import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import { authApiSlice } from "./api/auth.api";
import { fileApiSlice } from "./api/files.api";
import { userApiSlice } from "./api/users.api";
import { friendsApi } from "./api/friends.api";

export const store = configureStore({
  reducer: {
    [fileApiSlice.reducerPath]: fileApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(fileApiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(friendsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
