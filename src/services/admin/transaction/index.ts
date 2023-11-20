import { authApi } from "@/services/auth";

export const transactionApi = authApi.injectEndpoints({
  // reducerPath: "transactionApi",
  // baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getActiveUsers: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/active-users",
        method: "GET",
      }),
    }),
    getTopCustomers: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/active-users?sort=totalAmountPaid",
        method: "GET",
      }),
    }),
    getTransactionVolume: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/user-transaction-volumes",
        method: "GET",
      }),
    }),
    getAllBooking: builder.query<any, any>({
      query: ({ pageLimit, currentPage }) => ({
        url: `/admin-analytic/bookings?limit=${pageLimit}&page=${currentPage}`,
        method: "GET",
      }),
    }),
    getMostBookedTrips: builder.query<any, void>({
      query: () => ({
        url: "/outing/outings?sort=uniqueBookingCount",
        method: "GET",
      }),
    }),
    getBookingChart: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/bookings/chart",
        method: "GET",
      }),
    }),
    getAllTransaction: builder.query<any, any>({
      query: ({ pageLimit, currentPage }) => ({
        url: `/admin-analytic/transactions?limit=${pageLimit}&page=${currentPage}`,
        method: "GET",
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
