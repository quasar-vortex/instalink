import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseUser,
  UpdateUserRequest,
  UpdateUserResponse,
  GetUserByIdResponse,
} from "../../types";
import { myBaseQuery } from "./base.api";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: myBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Fetch signed-in user info
    getMe: builder.query<BaseUser, void>({
      query: () => "/users/me",
      providesTags: (result) =>
        result ? [{ type: "User", id: result.id }] : [],
    }),

    // Update signed-in user info
    updateMe: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (updateData) => ({
        url: "/users/me",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: updateData,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "User", id: result.id }] : [],
    }),
    updateAvatar: builder.mutation<
      UpdateUserResponse,
      { avatarFileId: string }
    >({
      query: (updateData) => ({
        url: "/users/me/avatar",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: updateData,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "User", id: result.id }] : [],
    }),

    // Fetch a user by ID
    getUserById: builder.query<GetUserByIdResponse, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useGetUserByIdQuery,
  useUpdateAvatarMutation,
} = userApiSlice;
