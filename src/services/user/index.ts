import { authApi } from "@/services/auth";

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

export const userApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<any, any>({
      query: () => ({ url: "/user", method: "GET" }),
      providesTags: ["User"],
    }),
    changePassword: builder.mutation<any, ChangePasswordPayload>({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: { ...data },
      }),
    }),
    getWalletBalance: builder.query<any, void>({
      query: () => ({ url: "/wallet/wallet", method: "GET" }),
      providesTags: ["UserInfo"],
    }),
    getTransactions: builder.query<any, any>({
      query: (query) => ({
        url: `/transaction/transactions${query}`,
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),
    getTransactionsById: builder.query<any, any>({
      query: (query) => ({
        url: `/transaction/transactions/${query}`,
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),
    getBookingHistory: builder.query<any, any>({
      query: (query) => ({
        url: `/booking/bookings${query}`,
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),
    initiateLinkDeposit: builder.mutation<any, any>({
      query: (data) => ({
        url: "/fiat-deposit/deposits/link",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    initiateCardDeposit: builder.mutation<any, InitiateCardDepositPayload>({
      query: (data) => ({
        url: "/fiat-deposit/deposits/card",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    submitCardPin: builder.mutation<any, any>({
      query: (data) => ({
        url: "/fiat-deposit/deposits/card/submit-pin",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    submitCardOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: "/fiat-deposit/deposits/card/submit-otp",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    createPaymentCard: builder.mutation<any, CreatePaymentCardPayload>({
      query: (data) => ({
        url: "/payment-cards/cards",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    createPaymentCardPin: builder.mutation<any, any>({
      query: (data) => ({
        url: "/payment-cards/deposits/card/submit-pin",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    createPaymentCardOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: "/payment-cards/deposits/card/submit-otp",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getPaymentCards: builder.query<any, void>({
      query: () => ({
        url: "/payment-cards/cards",
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),
    deletePaymentCards: builder.mutation<any, any>({
      query: (query) => ({
        url: `/payment-cards/cards/${query}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserInfo"],
    }),
    changeEmail: builder.mutation<any, ChangeEmailPayload>({
      query: (data) => ({
        url: "/user/change-email",
        method: "POST",
        body: { ...data },
      }),
    }),
    changeEmailOtp: builder.mutation<any, ChangeEmailOtpPayload>({
      query: (data) => ({
        url: "/user/change-email/otp",
        method: "POST",
        body: { ...data },
      }),
    }),
    confirmChangeEmailOtp: builder.mutation<any, ConfirmEmailOtpPayload>({
      query: (data) => ({
        url: "/user/change-email/confirm/otp",
        method: "POST",
        body: { ...data },
      }),
    }),
    updateUserProfile: builder.mutation<any, UpdateUserProfilePayload>({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["User"],
    }),
    updateUserPicture: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user/profile-image",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    createOutingLike: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/outing-likes/outings/${query}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getOutingLike: builder.query<any, any>({
      query: (query) => ({
        url: `/outing-likes/outings${query}`,
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),
    createBooking: builder.mutation<any, { query: any; data: any }>({
      query: ({ query, data }) => ({
        url: `/booking/outing/${query}/bookings`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getBookingCost: builder.mutation<any, { query: any; data: any }>({
      query: ({ query, data }) => ({
        url: `/booking/outing/${query}/bookings/cost`,
        method: "POST",
        body: { ...data },
      }),
    }),
    getBookingById: builder.query<any, { query: any; id: any }>({
      query: ({ query, id }) => ({
        url: `/booking/outing/${query}/bookings/${id}`,
        method: "GET",
      }),
    }),
    handleCheckout: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/checkout/bookings/${query}/checkout`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getNotifications: builder.query<any, any>({
      query: (query) => ({
        url: `/notifications/notifications${query}`,
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),
    markNotification: builder.mutation<any, any>({
      query: (query) => ({
        url: `/notifications/notifications/${query}/mark-read`,
        method: "PUT",
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getUpcomingSchedule: builder.query<any, void>({
      query: () => ({
        url: "/saving-plan/upcoming-outing-schedules?limit=20",
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),
    handleBookingParticipants: builder.mutation<any, any>({
      query: ({ query, id, data }) => ({
        url: `/booking/outing/${query}/bookings/${id}/participants/bulk`,
        method: "POST",
        body: [...data],
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    createContact: builder.mutation<any, ContactUsPayload>({
      query: (data) => ({
        url: "/contact/contacts/",
        method: "POST",
        body: { ...data },
      }),
    }),
    newsletterSubscription: builder.mutation<any, any>({
      query: (data) => ({
        url: "/newsletter/newsletters",
        method: "POST",
        body: { ...data },
      }),
    }),
    generateReferalCode: builder.mutation<any, void>({
      query: () => ({
        url: "/referral/generate-code",
        method: "POST",
      }),
    }),
    getReferralHistory: builder.query<any, void>({
      query: () => ({
        url: "/referral/history",
        method: "GET",
      }),
    }),
    logout: builder.mutation<any, any>({
      query: () => ({ url: "/user/logout/", method: "POST" }),
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
  useGetTransactionsByIdQuery,
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
  useLazyGetOutingLikeQuery,
  useCreatePaymentCardMutation,
  useGetPaymentCardsQuery,
  useDeletePaymentCardsMutation,
  useCreatePaymentCardOtpMutation,
  useCreatePaymentCardPinMutation,
  useGenerateReferalCodeMutation,
  useGetReferralHistoryQuery,
} = userApi;
