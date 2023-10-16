import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getActiveUsers: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/active-users",
        method: "get",
      }),
    }),
    getTopCustomers: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/active-users?sort=totalAmountPaid",
        method: "get",
      }),
    }),
    getTransactionVolume: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/user-transaction-volumes",
        method: "get",
      }),
    }),
    getAllBooking: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/bookings",
        method: "get",
      }),
    }),
    getMostBookedTrips: builder.query<any, void>({
      query: () => ({
        url: "/outing/outings?sort=uniqueBookingCount",
        method: "get",
      }),
    }),
    getBookingChart: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/bookings/chart",
        method: "get",
      }),
    }),
    getAllTransaction: builder.query<any, any>({
      query: ({ pageLimit, currentPage }) => ({
        url: `/admin-analytic/transactions?limit=${pageLimit}&page=${currentPage}`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useGetActiveUsersQuery,
  useGetTopCustomersQuery,
  useGetAllBookingQuery,
  useGetMostBookedTripsQuery,
  useGetAllTransactionQuery,
  useGetBookingChartQuery,
  useGetTransactionVolumeQuery,
} = transactionApi;
