import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

import type {
  CreateBlogPostPayload,
  CreateBlogTagsPayload,
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
    deleteOuting: builder.mutation<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}`,
        method: "delete",
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteBlog: builder.mutation<any, any>({
      query: (query) => ({
        url: `/blog/posts/${query}`,
        method: "delete",
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
    getChargePlan: builder.query<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}/charge-plans`,
        method: "get",
      }),
    }),
    createOutingAddon: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-addon/outings/${query}`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOutingAddon: builder.mutation<any, any>({
      query: ({ query, id }) => ({
        url: `/outing-addon/outings/${query}/outingAddons/${id}`,
        method: "delete",
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
    deleteReview: builder.mutation<any, any>({
      query: ({ query, id }) => ({
        url: `/outing-review/outings/${query}/reviews/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOutingGalleryImage: builder.mutation<any, any>({
      query: ({ query, id }) => ({
        url: `/outing/outings/${query}/outing-gallery/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOutingFeaturedImage: builder.mutation<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}/outing-gallery/remove/featured-image`,
        method: "delete",
      }),
      invalidatesTags: ["Admin"],
    }),
    createBlogTags: builder.mutation<any, CreateBlogTagsPayload>({
      query: (data) => ({
        url: "/blog/categories",
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getBlogTags: builder.query<any, void>({
      query: () => ({
        url: `/blog/categories?limit=100`,
        method: "get",
      }),
      providesTags: ["Admin"],
    }),
    createBlogPost: builder.mutation<any, CreateBlogPostPayload>({
      query: (data) => ({
        url: "/blog/posts",
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateBlogPost: builder.mutation<
      any,
      { query: string; data: CreateBlogPostPayload }
    >({
      query: ({ query, data }) => ({
        url: `/blog/posts/${query}`,
        method: "put",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createBlogImage: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/blog/posts/${query}/featured-images`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateBlogImage: builder.mutation<any, any>({
      query: ({ query, id, data }) => ({
        url: `/blog/posts/${query}/featured-images/${id}`,
        method: "put",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getBlogPost: builder.query<any, any>({
      query: (query) => ({
        url: `/blog/posts${query}`,
        method: "get",
      }),
      providesTags: ["Admin"],
    }),
    createOutingDate: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-date/outings/${query}`,
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOutingDate: builder.mutation<any, any>({
      query: (query) => ({
        url: `/outing-date/${query}`,
        method: "delete",
      }),
      invalidatesTags: ["Admin"],
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
  useDeleteOutingAddonMutation,
  useGetOutingAddonsQuery,
  useCreateOutingAddonIconMutation,
  useCreateReviewMutation,
  useGetReviewsQuery,
  useUpdateOutingMutation,
  useDeleteOutingMutation,
  useDeleteReviewMutation,
  useCreateBlogTagsMutation,
  useGetBlogTagsQuery,
  useCreateBlogPostMutation,
  useGetBlogPostQuery,
  useCreateBlogImageMutation,
  useDeleteBlogMutation,
  useUpdateBlogPostMutation,
  useUpdateBlogImageMutation,
  useGetChargePlanQuery,
  useDeleteOutingFeaturedImageMutation,
  useDeleteOutingGalleryImageMutation,
  useCreateOutingDateMutation,
  useDeleteOutingDateMutation,
} = adminApi;
