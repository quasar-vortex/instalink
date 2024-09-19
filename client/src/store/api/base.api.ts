import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { UserPayload } from "../../types";
import { RootState } from "../store";
import { Mutex } from "async-mutex";
import { removeUser, setUser } from "../slices/auth.slice";

// creates a mutual exclusion, stops the function from running multiple times and race conditions
const mutex = new Mutex();
export const myBaseQuery = fetchBaseQuery({
  baseUrl: "/api/",
  credentials: "include", // Needed to send tokens and cookies
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// This is basically like axios interceptors. Will check if the status is a 401 and if so then refresh the user and retry the initial request.
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Waits for mutex to be available
  await mutex.waitForUnlock();
  let result = await myBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // Check if the mutex is still locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await myBaseQuery(
          "/auth/refresh",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(setUser(refreshResult.data as UserPayload));
          // Retries the initial query
          result = await myBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(removeUser());
        }
      } finally {
        // Release is called to stop the mutex from preventing calls to refresh
        release();
      }
    } else {
      // wait for the mutex to become available
      await mutex.waitForUnlock();
      result = await myBaseQuery(args, api, extraOptions);
    }
  }
  return result;
};
