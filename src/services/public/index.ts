import { authApi } from "@/services/auth";

import type { GetOutingByContinentPaylod } from "./payload";

export const publicApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOutings: builder.query<any, any>({
      query: (query) => ({ url: `/outing/outings${query}`, method: "GET" }),
    }),
    searchOutings: builder.query<any, any>({
      query: (query) => ({ url: `/outing/outings${query}`, method: "GET" }),
    }),
    getOutingAddOn: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-addon/outings/${query}`,
        method: "GET",
      }),
    }),
    getOutingLocations: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-destination/outings/location/locations?type=${query}`,
        method: "GET",
      }),
    }),
    fetchAllOutings: builder.query<any, GetOutingByContinentPaylod>({
      query: ({
        minPrice,
        maxPrice,
        subType,
        type,
        month,
        location,
        search,
        limit,
        page,
      }) => ({
        url: `/outing/outings?type=${type || ""}&minPrice=${
          minPrice || ""
        }&maxPrice=${maxPrice || ""}&subType=${subType || ""}&month=${
          month || ""
        }&location=${location || ""}&search=${search || ""}&limit=${
          limit || ""
        }&page=${page || ""}`,
        method: "GET",
      }),
    }),
    getOutingByContinents: builder.query<any, GetOutingByContinentPaylod>({
      query: ({ minPrice, maxPrice, subType, type, month, location }) => ({
        url: `/outing/outings/continents?type=${type || ""}&minPrice=${
          minPrice || ""
        }&maxPrice=${maxPrice || ""}&subType=${subType || ""}&month=${
          month || ""
        }&location=${location || ""}`,
        method: "GET",
      }),
    }),
    getOutingByMonths: builder.query<any, GetOutingByContinentPaylod>({
      query: ({ minPrice, maxPrice, subType, type, month, location }) => ({
        url: `/outing/outings/months?type=${type || ""}&minPrice=${
          minPrice || ""
        }&maxPrice=${maxPrice || ""}&subType=${subType || ""}&month=${
          month || ""
        }&location=${location || ""}`,
        method: "GET",
      }),
    }),
    getOutingByType: builder.query<any, GetOutingByContinentPaylod>({
      query: ({ minPrice, maxPrice, subType, type, month, location }) => ({
        url: `/outing/outings/types?type=${type || ""}&minPrice=${
          minPrice || ""
        }&maxPrice=${maxPrice || ""}&subType=${subType || ""}&month=${
          month || ""
        }&location=${location || ""}`,
        method: "GET",
      }),
    }),
    getOutingDurations: builder.query<any, void>({
      query: () => ({
        url: "/outing-date/outings/duration/durations",
        method: "GET",
      }),
    }),
    getOutingPriceRange: builder.query<any, void>({
      query: () => ({
        url: "/outing/outings/price/price-range",
        method: "GET",
      }),
    }),
    getOutingsByMultipleId: builder.mutation<any, any>({
      query: (data) => ({
        url: "/outing/outings/specific-duration/get-multiple",
        method: "POST",
        data,
      }),
    }),
    getOutingChargePlan: builder.query<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}/charge-plans`,
        method: "GET",
      }),
    }),
    getFeaturedBlog: builder.query<any, void>({
      query: () => ({
        url: "/blog/posts?status=true",
        method: "GET",
      }),
    }),
    getAllBlog: builder.query<any, any>({
      query: ({ pageLimit, currentPage, search }) => ({
        url: `/blog/posts?limit=${pageLimit}&page=${currentPage}&search=${search}`,
        method: "GET",
      }),
    }),
    getSingleBlog: builder.query<any, any>({
      query: (query) => ({
        url: `/blog/posts/${query}`,
        method: "GET",
      }),
    }),
    getRelatedBlogByCategory: builder.query<any, any>({
      query: (query) => ({
        url: `/blog/categories/${query}/posts/recommended`,
        method: "GET",
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
  useGetOutingByContinentsQuery,
  useGetOutingByMonthsQuery,
  useGetOutingByTypeQuery,
  useFetchAllOutingsQuery,
} = publicApi;
