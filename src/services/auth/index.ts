import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { HYDRATE } from "next-redux-wrapper";
// import toaster from "react-hot-toast";
import type { RootState } from "@/store";
import { logout } from "@/store/slices/userSlice";
import { getLocationFrom } from "@/utils";

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

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).user;

    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.data) {
    const errorData: any = result.error?.data;
    const expectedErrorCodes = [499, 401];
    // toaster.error(
    //   errorData?.meta?.message || "Something went wrong, try again later."
    // );
    if (
      !!errorData?.meta?.statusCode &&
      expectedErrorCodes.includes(errorData?.meta?.statusCode)
    ) {
      api.dispatch(logout());
      // window.location.replace("/login");
      window.location.replace(
        `/login?clfrm=${decodeURIComponent(getLocationFrom())}`
      );
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  // eslint-disable-next-line consistent-return
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Admin", "User", "UserInfo", "SavingPlan"],
  endpoints: (builder) => ({
    register: builder.mutation<any, RegisterPayload>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...data },
      }),
    }),
    login: builder.mutation<any, LoginPayload>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...data },
      }),
    }),
    verifyOTP: builder.mutation<any, VerifyOTPPayload>({
      query: (data) => ({
        url: "/auth/register/otp",
        method: "POST",
        body: { ...data },
      }),
    }),
    resendOTP: builder.mutation<any, ResendOTPPayload>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: { ...data },
      }),
    }),
    forgotPassword: builder.mutation<any, ForgotPasswordPayload>({
      query: (data) => ({
        url: "/auth/login/forgot-password",
        method: "POST",
        body: { ...data },
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation<
      any,
      VerifyForgotPasswordOTPPayload
    >({
      query: (data) => ({
        url: "/auth/login/forgot-password/otp-verification",
        method: "POST",
        body: { ...data },
      }),
    }),
    verifyForgotPassword: builder.mutation<any, ForgotPasswordOTPPayload>({
      query: (data) => ({
        url: "/auth/login/forgot-password/otp",
        method: "POST",
        body: { ...data },
      }),
    }),
    googleLogin: builder.mutation<any, GoogleLoginPayload>({
      query: (data) => ({
        url: "/auth/social/google/login",
        method: "POST",
        body: { ...data },
      }),
    }),
    googleSignup: builder.mutation<any, GoogleLoginPayload>({
      query: (data) => ({
        url: "/auth/social/google/register",
        method: "POST",
        body: { ...data },
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
