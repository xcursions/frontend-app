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
    getOutingLocations: builder.query<any, void>({
      query: () => ({
        url: "/outing-destination/outings/location/locations",
        method: "get",
      }),
    }),
    getOutingDurations: builder.query<any, void>({
      query: () => ({
        url: "/outing-date/outings/duration/durations",
        method: "get",
      }),
    }),
    getOutingPriceRange: builder.query<any, void>({
      query: () => ({
        url: "/outing/outings/price/price-range",
        method: "get",
      }),
    }),
    getOutingsByMultipleId: builder.mutation<any, any>({
      query: (data) => ({
        url: "/outing/outings/specific-duration/get-multiple",
        method: "post",
        data,
      }),
    }),
    getOutingChargePlan: builder.query<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}/charge-plans`,
        method: "get",
      }),
    }),
    getFeaturedBlog: builder.query<any, void>({
      query: () => ({
        url: "/blog/posts?status=true",
        method: "get",
      }),
    }),
    getAllBlog: builder.query<any, any>({
      query: ({ pageLimit, currentPage, search }) => ({
        url: `/blog/posts?limit=${pageLimit}&page=${currentPage}&search=${search}`,
        method: "get",
      }),
    }),
    getSingleBlog: builder.query<any, any>({
      query: (query) => ({
        url: `/blog/posts/${query}`,
        method: "get",
      }),
    }),
    getRelatedBlogByCategory: builder.query<any, any>({
      query: (query) => ({
        url: `/blog/categories/${query}/posts/recommended`,
        method: "get",
      }),
    }),
  }),
});
export const {
  useGetAllOutingsQuery,
  useLazyGetAllOutingsQuery,
  useSearchOutingsQuery,
  useGetOutingAddOnQuery,
  useGetOutingLocationsQuery,
  useGetOutingDurationsQuery,
  useGetOutingPriceRangeQuery,
  useGetOutingsByMultipleIdMutation,
  useLazySearchOutingsQuery,
  useGetOutingChargePlanQuery,
  useGetFeaturedBlogQuery,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useGetRelatedBlogByCategoryQuery,
} = publicApi;
