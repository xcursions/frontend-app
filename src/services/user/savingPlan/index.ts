import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

import type { FlightPayload } from "../payload";

export const savingPlanApi = createApi({
  reducerPath: "savingPlanApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["SavingPlan"],
  endpoints: (builder) => ({
    getSavingPlanSummary: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/saving-plan/bookings/${query}/plans/summary`,
        method: "post",
        data,
      }),
      invalidatesTags: ["SavingPlan"],
    }),
    getUpcomingPayment: builder.query<any, void>({
      query: () => ({
        url: "/saving-plan/upcoming-payments?limit=20",
        method: "get",
      }),
      providesTags: ["SavingPlan"],
    }),
    createFlightBooking: builder.mutation<any, FlightPayload>({
      query: (data) => ({
        url: `/booking/bookings/flight`,
        method: "post",
        data,
      }),
    }),
  }),
});

export const {
  useGetSavingPlanSummaryMutation,
  useGetUpcomingPaymentQuery,
  useCreateFlightBookingMutation,
} = savingPlanApi;
