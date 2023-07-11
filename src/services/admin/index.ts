import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

import type { CreateOutingPayload } from "./payload";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createOuting: builder.mutation<any, CreateOutingPayload>({
      query: (data) => ({ url: "/outing/outings", method: "post", data }),
    }),
    createOutingImage: builder.mutation<any, { query: any; data: any }>({
      query: ({ query, data }) => ({
        url: `/outing/outings/${query}/outing-gallery/images`,
        method: "post",
        data,
      }),
    }),
  }),
});
export const { useCreateOutingMutation, useCreateOutingImageMutation } =
  adminApi;
