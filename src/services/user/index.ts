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
  endpoints: (builder) => ({
    getUser: builder.query<any, any>({
      query: () => ({ url: "/user", method: "get" }),
    }),
    changePassword: builder.mutation<any, ChangePasswordPayload>({
      query: (data) => ({ url: "/user/change-password", method: "post", data }),
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
    }),
    updateUserPicture: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user/profile-image",
        method: "put",
        data,
      }),
    }),
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: "/user/profile",
        method: "get",
      }),
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
} = userApi;
