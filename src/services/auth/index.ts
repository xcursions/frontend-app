import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

import type {
  ForgotPasswordOTPPayload,
  ForgotPasswordPayload,
  GoogleLoginPayload,
  LoginPayload,
  RegisterPayload,
  ResendOTPPayload,
  VerifyForgotPasswordOTPPayload,
  VerifyOTPPayload,
} from "./payload";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
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
        url: "/auth/login/forgot-password",
        method: "post",
        data,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation<
      any,
      VerifyForgotPasswordOTPPayload
    >({
      query: (data) => ({
        url: "/auth/login/forgot-password/otp-verification",
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useVerifyForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useGoogleLoginMutation,
  useGoogleSignupMutation,
  useForgotPasswordMutation,
} = authApi;
