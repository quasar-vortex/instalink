import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginUserSchema, RegisterUserSchema } from "@/lib/models/authModels";
import { LoginUserReturnPayload } from "@/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (b) => ({
    loginUser: b.mutation<LoginUserReturnPayload, LoginUserSchema>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registerUser: b.mutation<LoginUserReturnPayload, RegisterUserSchema>({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    logOffUser: b.query<{ message: string }, null | void>({
      query: () => ({
        method: "GET",
        url: "/auth/logoff",
        credentials: "include",
      }),
    }),
    refreshUser: b.query<LoginUserReturnPayload, void>({
      query: () => ({
        method: "GET",
        url: "/auth/refresh",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogOffUserQuery,
  useRefreshUserQuery,
} = authApi;
