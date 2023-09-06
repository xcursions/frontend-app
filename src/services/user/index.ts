// @ts-nocheck

import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

import type {
  ChangeEmailOtpPayload,
  ChangeEmailPayload,
  ChangePasswordPayload,
  ConfirmEmailOtpPayload,
  ContactUsPayload,
  CreatePaymentCardPayload,
  InitiateCardDepositPayload,
  UpdateUserProfilePayload,
} from "./payload";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "UserInfo"],
  endpoints: (builder) => ({
    getUser: builder.query<any, any>({
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
    getBookingHistory: builder.query<any, any>({
      query: (query) => ({
        url: `/booking/bookings${query}`,
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
    initiateCardDeposit: builder.mutation<any, InitiateCardDepositPayload>({
      query: (data) => ({
        url: "/fiat-deposit/deposits/card",
        method: "post",
        data,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    createPaymentCard: builder.mutation<any, CreatePaymentCardPayload>({
      query: (data) => ({
        url: "/payment-cards/cards",
        method: "post",
        data,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getPaymentCards: builder.query<any, void>({
      query: () => ({
        url: "/payment-cards/cards",
        method: "get",
      }),
      providesTags: ["UserInfo"],
    }),
    deletePaymentCards: builder.mutation<any, any>({
      query: (query) => ({
        url: `/payment-cards/cards/${query}`,
        method: "delete",
      }),
      invalidatesTags: ["UserInfo"],
    }),
    submitCardPin: builder.mutation<any, any>({
      query: (data) => ({
        url: "/fiat-deposit/deposits/card/submit-pin",
        method: "post",
        data,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    submitCardOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: "/fiat-deposit/deposits/card/submit-otp",
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
    createOutingLike: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-likes/outings/${query}`,
        method: "post",
        data,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getOutingLike: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-likes/outings${query}`,
        method: "get",
      }),
      providesTags: ["UserInfo"],
    }),
    createBooking: builder.mutation<any, { query: any; data: any }>({
      query: ({ query, data }) => ({
        url: `/booking/outing/${query}/bookings`,
        method: "post",
        data,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getBookingCost: builder.mutation<any, { query: any; data: any }>({
      query: ({ query, data }) => ({
        url: `/booking/outing/${query}/bookings/cost`,
        method: "post",
        data,
      }),
    }),
    getBookingById: builder.query<any, { query: any; id: any }>({
      query: ({ query, id }) => ({
        url: `/booking/outing/${query}/bookings/${id}`,
        method: "get",
      }),
    }),
    handleCheckout: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/checkout/bookings/${query}/checkout`,
        method: "post",
        data,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getNotifications: builder.query<any, any>({
      query: (query) => ({
        url: `/notifications/notifications${query}`,
        method: "get",
      }),
      providesTags: ["UserInfo"],
    }),
    markNotification: builder.mutation<any, any>({
      query: (query) => ({
        url: `/notifications/notifications/${query}/mark-read`,
        method: "put",
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getUpcomingSchedule: builder.query<any, void>({
      query: () => ({
        url: "/saving-plan/upcoming-outing-schedules",
        method: "get",
      }),
      providesTags: ["UserInfo"],
    }),
    handleBookingParticipants: builder.mutation<any, any>({
      query: ({ query, id, data }) => ({
        url: `/booking/outing/${query}/bookings/${id}/participants/bulk`,
        method: "post",
        data,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: "/user/profile",
        method: "get",
      }),
      providesTags: ["User"],
    }),
    createContact: builder.mutation<any, ContactUsPayload>({
      query: (data) => ({
        url: "/contact/contacts/",
        method: "post",
        data,
      }),
    }),
    newsletterSubscription: builder.mutation<any, any>({
      query: (data) => ({
        url: "/newsletter/newsletters",
        method: "post",
        data,
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
  useGetWalletBalanceQuery,
  useCreateBookingMutation,
  useLazyGetTransactionsQuery,
  useGetTransactionsQuery,
  useGetBookingHistoryQuery,
  useLazyGetBookingHistoryQuery,
  useGetBookingCostMutation,
  useGetBookingByIdQuery,
  useHandleCheckoutMutation,
  useHandleBookingParticipantsMutation,
  useInitiateLinkDepositMutation,
  useInitiateCardDepositMutation,
  useSubmitCardPinMutation,
  useSubmitCardOtpMutation,
  useCreateContactMutation,
  useNewsletterSubscriptionMutation,
  useGetNotificationsQuery,
  useMarkNotificationMutation,
  useGetUpcomingScheduleQuery,
  useCreateOutingLikeMutation,
  useGetOutingLikeQuery,
  useCreatePaymentCardMutation,
  useGetPaymentCardsQuery,
  useDeletePaymentCardsMutation,
} = userApi;
