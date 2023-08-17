import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

import type {
  CreateOutingChargePlanPayload,
  CreateOutingDestinationPayload,
  CreateOutingPayload,
} from "./payload";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getOutings: builder.query<any, any>({
      query: (query) => ({ url: `/outing/outings${query}`, method: "get" }),
      providesTags: ["Admin"],
    }),
    createOuting: builder.mutation<any, CreateOutingPayload>({
      query: (data) => ({ url: "/outing/outings", method: "post", data }),
      invalidatesTags: ["Admin"],
    }),
    updateOuting: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing/outings/${query}`,
        method: "put",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createOutingImage: builder.mutation<any, { query: any; data: any }>({
      query: ({ query, data }) => ({
        url: `/outing/outings/${query}/outing-gallery/images`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createOutingDestination: builder.mutation<
      any,
      { query: string; data: CreateOutingDestinationPayload }
    >({
      query: ({ query, data }) => ({
        url: `/outing-destination/outings/${query}`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createOutingPickup: builder.mutation<
      any,
      { query: string; data: CreateOutingDestinationPayload }
    >({
      query: ({ query, data }) => ({
        url: `/outing-pickup/outings/${query}`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createChargePlan: builder.mutation<
      any,
      { query: string; data: CreateOutingChargePlanPayload }
    >({
      query: ({ query, data }) => ({
        url: `/outing/outings/${query}/charge-plans`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createOutingAddon: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-addon/outings/${query}`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getOutingAddons: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-addon/outings/${query}`,
        method: "get",
      }),
      providesTags: ["Admin"],
    }),
    createOutingAddonIcon: builder.mutation<any, any>({
      query: ({ query, id, data }) => ({
        url: `/outing-addon/outings/${query}/outingAddons/${id}/icon`,
        method: "put",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createReview: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-review/outings/${query}/reviews`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getReviews: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-review/outings/${query}/reviews`,
        method: "get",
      }),
      providesTags: ["Admin"],
    }),
  }),
});
export const {
  useGetOutingsQuery,
  useLazyGetOutingsQuery,
  useCreateOutingMutation,
  useCreateOutingImageMutation,
  useCreateOutingDestinationMutation,
  useCreateOutingPickupMutation,
  useCreateChargePlanMutation,
  useCreateOutingAddonMutation,
  useGetOutingAddonsQuery,
  useCreateOutingAddonIconMutation,
  useCreateReviewMutation,
  useGetReviewsQuery,
  useUpdateOutingMutation,
} = adminApi;
