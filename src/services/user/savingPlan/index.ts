import { authApi } from "@/services/auth";

import type { FlightPayload } from "../payload";

export const savingPlanApi = authApi.injectEndpoints({
  // reducerPath: "savingPlanApi",
  // baseQuery: axiosBaseQuery(),
  // tagTypes: ["SavingPlan"],
  endpoints: (builder) => ({
    getSavingPlanSummary: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/saving-plan/bookings/${query}/plans/summary`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["SavingPlan"],
    }),
    getUpcomingPayment: builder.query<any, void>({
      query: () => ({
        url: "/saving-plan/upcoming-payments?limit=20",
        method: "GET",
      }),
      providesTags: ["SavingPlan"],
    }),
    createFlightBooking: builder.mutation<any, FlightPayload>({
      query: (data) => ({
        url: `/booking/bookings/flight`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetSavingPlanSummaryMutation,
  useGetUpcomingPaymentQuery,
  useCreateFlightBookingMutation,
} = savingPlanApi;
