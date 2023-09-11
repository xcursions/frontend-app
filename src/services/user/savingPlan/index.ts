import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

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
      query: (data) => ({
        url: "/saving-plan/upcoming-payments?limit=20",
        method: "get",
        data,
      }),
      providesTags: ["SavingPlan"],
    }),
  }),
});

export const { useGetSavingPlanSummaryMutation, useGetUpcomingPaymentQuery } =
  savingPlanApi;
