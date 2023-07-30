import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAllOutings: builder.query<any, any>({
      query: (query) => ({ url: `/outing/outings${query}`, method: "get" }),
    }),
    searchOutings: builder.query<any, any>({
      query: (query) => ({ url: `/outing/outings${query}`, method: "get" }),
    }),
    getOutingAddOn: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-addon/outings/${query}`,
        method: "get",
      }),
    }),
    getOutingChargePlan: builder.query<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}/charge-plans`,
        method: "get",
      }),
    }),
  }),
});
export const {
  useGetAllOutingsQuery,
  useSearchOutingsQuery,
  useGetOutingAddOnQuery,
  useLazySearchOutingsQuery,
  useGetOutingChargePlanQuery,
} = publicApi;
