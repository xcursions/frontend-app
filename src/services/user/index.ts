import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

import type {
  ChangeEmailOtpPayload,
  ChangeEmailPayload,
  ChangePasswordPayload,
  ConfirmEmailOtpPayload,
  UpdateUserProfilePayload,
} from "./payload";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "UserInfo"],
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => ({ url: "/user", method: "get" }),
      providesTags: ["User"],
    }),
    changePassword: builder.mutation<any, ChangePasswordPayload>({
      query: (data) => ({ url: "/user/change-password", method: "post", data }),
    }),
    getWalletBalance: builder.query<any, void>({
      query: () => ({ url: "/wallet/wallet", method: "get" }),
      providesTags: ["UserInfo"],
    }),
    getTransactions: builder.query<any, any>({
      query: (query) => ({
        url: `/fiat-deposit/deposits${query}`,
        method: "get",
      }),
      providesTags: ["UserInfo"],
    }),
    initiateLinkDeposit: builder.mutation<any, any>({
      query: (data) => ({
        url: "/fiat-deposit/deposits/link",
        method: "post",
        data,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    changeEmail: builder.mutation<any, ChangeEmailPayload>({
      query: (data) => ({ url: "/user/change-email", method: "post", data }),
    }),
    changeEmailOtp: builder.mutation<any, ChangeEmailOtpPayload>({
      query: (data) => ({
        url: "/user/change-email/otp",
        method: "post",
        data,
      }),
    }),
    confirmChangeEmailOtp: builder.mutation<any, ConfirmEmailOtpPayload>({
      query: (data) => ({
        url: "/user/change-email/confirm/otp",
        method: "post",
        data,
      }),
    }),
    updateUserProfile: builder.mutation<any, UpdateUserProfilePayload>({
      query: (data) => ({
        url: "/user/profile",
        method: "put",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserPicture: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user/profile-image",
        method: "put",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: "/user/profile",
        method: "get",
      }),
      providesTags: ["User"],
    }),
    logout: builder.mutation<any, any>({
      query: () => ({ url: "/user/logout/", method: "post" }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useChangeEmailOtpMutation,
  useConfirmChangeEmailOtpMutation,
  useLogoutMutation,
  useUpdateUserPictureMutation,
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
  useGetWalletBalanceQuery,
  useGetTransactionsQuery,
  useInitiateLinkDepositMutation,
} = userApi;
