import { createApi } from "@reduxjs/toolkit/query/react";
import { Friend, PaginationMeta } from "../../types";
import { myBaseQuery } from "./base.api";

interface FriendsResponse {
  data: Friend[];
  meta: PaginationMeta;
}

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: myBaseQuery,
  endpoints: (builder) => ({
    getFriends: builder.query<
      FriendsResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/friends",
        params: { page, limit, search },
      }),
    }),
  }),
});

export const { useGetFriendsQuery } = friendsApi;
