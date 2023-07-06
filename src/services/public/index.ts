import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAllOutings: builder.query<any, void>({
      query: () => ({ url: "/outing/outings", method: "get" }),
    }),
    searchOutings: builder.query<any, any>({
      query: (query) => ({ url: `/outing/outings${query}`, method: "get" }),
    }),
  }),
});
export const { useGetAllOutingsQuery, useSearchOutingsQuery } = publicApi;
