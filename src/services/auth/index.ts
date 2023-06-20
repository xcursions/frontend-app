import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

import type {
  ForgotPasswordOTPPayload,
  ForgotPasswordPayload,
  GoogleLoginPayload,
  LoginPayload,
  RegisterPayload,
  ResendOTPPayload,
  VerifyOTPPayload,
} from "./payload";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "VendorInfo"],
  endpoints: (builder) => ({
    register: builder.mutation<any, RegisterPayload>({
      query: (data) => ({ url: "/auth/register", method: "post", data }),
    }),
    login: builder.mutation<any, LoginPayload>({
      query: (data) => ({ url: "/auth/login", method: "post", data }),
    }),
    verifyOTP: builder.mutation<any, VerifyOTPPayload>({
      query: (data) => ({ url: "/auth/register/otp", method: "post", data }),
    }),
    resendOTP: builder.mutation<any, ResendOTPPayload>({
      query: (data) => ({ url: "/auth/resend-otp", method: "post", data }),
    }),
    forgotPassword: builder.mutation<any, ForgotPasswordPayload>({
      query: (data) => ({
        url: "/auth/login/forget-password",
        method: "post",
        data,
      }),
    }),
    verifyForgotPassword: builder.mutation<any, ForgotPasswordOTPPayload>({
      query: (data) => ({
        url: "/auth/login/forgot-password/otp",
        method: "post",
        data,
      }),
    }),
    googleLogin: builder.mutation<any, GoogleLoginPayload>({
      query: (data) => ({
        url: "/auth/social/google/login",
        method: "post",
        data,
      }),
    }),
    googleSignup: builder.mutation<any, GoogleLoginPayload>({
      query: (data) => ({
        url: "/auth/social/google/register",
        method: "post",
        data,
      }),
    }),
    getUser: builder.query<any, any>({
      query: () => ({ url: "/user/account", method: "get" }),
      providesTags: ["User"],
    }),

    updateVendorProfileAvatar: builder.mutation<any, any>({
      query: (data) => ({
        url: "/vendor/vendor/profile-photo",
        method: "post",
        data,
      }),
      invalidatesTags: ["VendorInfo"],
    }),

    getAllVendorsByCategory: builder.query<any, any>({
      query: ({ resolvedName, currentPage, pageLimit, categoryId }) => ({
        url: `/public/vendor-category?resolved_name=${resolvedName}&page=${currentPage}&pageLimit=${pageLimit}&category_id=${categoryId}`,
        method: "get",
      }),
    }),
    getSingleCategory: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/category/view-category?resolved_name=${id}`,
        method: "get",
      }),
    }),

    searchCategoryAndLocation: builder.query<any, string>({
      query: (query) => ({
        url: `/public/search${query}`,
        method: "get",
      }),
    }),

    getCategories: builder.query<any, void>({
      query: () => ({ url: "/public/category", method: "get" }),
    }),
    getAllVendorInfo: builder.query<any, string>({
      query: (query) => ({
        url: `/public/view-vendor?${query}`,
        method: "get",
      }),
      providesTags: ["VendorInfo"],
      transformResponse: (response: any) => {
        const dataTrans = response.data[0];

        const coverImages = dataTrans?.pictures?.filter(
          (item: { type: string }) => item.type === "cover"
        );

        const galleryImages = dataTrans?.pictures?.filter(
          (item: { type: string }) => item.type === "gallery"
        );

        const profilePicture: string | undefined =
          dataTrans?.profile_pic_url || undefined;

        return [dataTrans, coverImages, galleryImages, profilePicture];
      },
    }),
    logout: builder.mutation<any, any>({
      query: () => ({ url: "/user/logout/", method: "post" }),
    }),
    adminLogin: builder.mutation<any, LoginPayload>({
      query: (data) => ({ url: "/admin-account/login", method: "post", data }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazySearchCategoryAndLocationQuery,
  useSearchCategoryAndLocationQuery,
  useRegisterMutation,
  useVerifyOTPMutation,
  useLogoutMutation,
  useAdminLoginMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateVendorProfileAvatarMutation,
  useGetAllVendorInfoQuery,
  useLazyGetAllVendorInfoQuery,
  useResendOTPMutation,
  useGetCategoriesQuery,
  useGetAllVendorsByCategoryQuery,
  useVerifyForgotPasswordMutation,
  useGoogleLoginMutation,
  useGoogleSignupMutation,
  useForgotPasswordMutation,
  useGetSingleCategoryQuery,
  endpoints: { getAllVendorInfo },
} = authApi;
