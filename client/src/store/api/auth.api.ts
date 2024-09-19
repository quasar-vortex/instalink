import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  RefreshResponse,
  RegisterRequest,
  LoginRequest,
} from "../../types";
import { myBaseQuery } from "./base.api";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: myBaseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (registerData) => ({
        url: "/auth/register",
        method: "POST",
        body: registerData,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    refresh: builder.query<RefreshResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
    logOff: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logoff",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshQuery,
  useLogOffMutation,
} = authApiSlice;
