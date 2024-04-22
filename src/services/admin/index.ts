import { authApi } from "@/services/auth";
import type { ApiResponseTypes } from "@/types/ApiResponseType";

import type {
  CreateBannerPayload,
  CreateBlogPostPayload,
  CreateBlogTagsPayload,
  CreateOutingChargePlanPayload,
  CreateOutingDestinationPayload,
  CreateOutingPayload,
} from "./payload";

export const adminApi = authApi.injectEndpoints({
  // reducerPath: "adminApi",
  // baseQuery: axiosBaseQuery(),
  // tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getOutings: builder.query<any, any>({
      query: (query) => ({ url: `/outing/outings${query}`, method: "GET" }),
      providesTags: ["Admin"],
    }),
    createOuting: builder.mutation<any, CreateOutingPayload>({
      query: (data) => ({
        url: "/outing/outings",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    updateOuting: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing/outings/${query}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOuting: builder.mutation<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteBlog: builder.mutation<any, any>({
      query: (query) => ({
        url: `/blog/posts/${query}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    createOutingImage: builder.mutation<any, { query: any; data: any }>({
      query: ({ query, data }) => ({
        url: `/outing/outings/${query}/outing-gallery/images`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createOutingDestination: builder.mutation<
      any,
      { query: string; data: CreateOutingDestinationPayload }
    >({
      query: ({ query, data }) => ({
        url: `/outing-destination/outings/${query}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    createOutingPickup: builder.mutation<
      any,
      { query: string; data: CreateOutingDestinationPayload }
    >({
      query: ({ query, data }) => ({
        url: `/outing-pickup/outings/${query}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    createChargePlan: builder.mutation<
      any,
      { query: string; data: CreateOutingChargePlanPayload }
    >({
      query: ({ query, data }) => ({
        url: `/outing/outings/${query}/charge-plans`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    updateChargePlan: builder.mutation<
      any,
      { query: string; data: CreateOutingChargePlanPayload }
    >({
      query: ({ query, data }) => ({
        url: `/outing/outings/charge-plans/${query}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    getChargePlan: builder.query<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}/charge-plans`,
        method: "GET",
      }),
    }),
    createOutingAddon: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-addon/outings/${query}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    updateOutingAddon: builder.mutation<any, any>({
      query: ({ query, id, data }) => ({
        url: `/outing-addon/outings/${query}/outingAddons/${id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOutingAddon: builder.mutation<any, any>({
      query: ({ query, id }) => ({
        url: `/outing-addon/outings/${query}/outingAddons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    getOutingAddons: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-addon/outings/${query}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    createOutingAddonIcon: builder.mutation<any, any>({
      query: ({ query, id, data }) => ({
        url: `/outing-addon/outings/${query}/outingAddons/${id}/icon`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    createReview: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-review/outings/${query}/reviews`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    getReviews: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-review/outings/${query}/reviews`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    deleteReview: builder.mutation<any, any>({
      query: ({ query, id }) => ({
        url: `/outing-review/outings/${query}/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOutingGalleryImage: builder.mutation<any, any>({
      query: ({ query, id }) => ({
        url: `/outing/outings/${query}/outing-gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOutingFeaturedImage: builder.mutation<any, any>({
      query: (query) => ({
        url: `/outing/outings/${query}/outing-gallery/remove/featured-image`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    createBlogTags: builder.mutation<any, CreateBlogTagsPayload>({
      query: (data) => ({
        url: "/blog/categories",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    getBlogTags: builder.query<any, void>({
      query: () => ({
        url: `/blog/categories?limit=100`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    createBlogPost: builder.mutation<any, CreateBlogPostPayload>({
      query: (data) => ({
        url: "/blog/posts",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    updateBlogPost: builder.mutation<
      any,
      { query: string; data: CreateBlogPostPayload }
    >({
      query: ({ query, data }) => ({
        url: `/blog/posts/${query}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    createBlogImage: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/blog/posts/${query}/featured-images`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateBlogImage: builder.mutation<any, any>({
      query: ({ query, id, data }) => ({
        url: `/blog/posts/${query}/featured-images/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getBlogPost: builder.query<any, any>({
      query: ({ pageLimit, currentPage }) => ({
        url: `/blog/posts?limit=${pageLimit}&page=${currentPage}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getSingleBlogPost: builder.query<any, any>({
      query: (query) => ({
        url: `/blog/posts${query}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    createOutingDate: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-date/outings/${query}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteOutingDate: builder.mutation<any, any>({
      query: (query) => ({
        url: `/outing-date/${query}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    createBanner: builder.mutation<any, CreateBannerPayload>({
      query: (data) => ({
        url: "/campaigns/campaigns",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    createBannerImage: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/campaigns/campaigns/advert-image/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getAllBanner: builder.query<any, void>({
      query: () => ({
        url: "/campaigns/campaigns",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getSingleBanner: builder.query<any, string>({
      query: (id) => ({
        url: `/campaigns/campaigns/${id}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    updateBanner: builder.mutation<
      any,
      { id: string; data: CreateBannerPayload }
    >({
      query: ({ id, data }) => ({
        url: `/campaigns/campaigns/${id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteBanner: builder.mutation<ApiResponseTypes<unknown>, string>({
      query: (id) => ({
        url: `/campaigns/campaigns/${id}`,
        method: "DELETE",
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
  useUpdateChargePlanMutation,
  useCreateOutingAddonMutation,
  useUpdateOutingAddonMutation,
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
  useGetSingleBlogPostQuery,
  useCreateBlogImageMutation,
  useDeleteBlogMutation,
  useUpdateBlogPostMutation,
  useUpdateBlogImageMutation,
  useGetChargePlanQuery,
  useDeleteOutingFeaturedImageMutation,
  useDeleteOutingGalleryImageMutation,
  useCreateOutingDateMutation,
  useDeleteOutingDateMutation,
  useCreateBannerMutation,
  useCreateBannerImageMutation,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
  useGetAllBannerQuery,
  useGetSingleBannerQuery,
} = adminApi;
