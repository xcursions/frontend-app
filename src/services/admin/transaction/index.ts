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
    getBookingByUserId: builder.query<
      any,
      { userId: string; pageLimit: number; currentPage: number }
    >({
      query: ({ userId, pageLimit, currentPage }) => ({
        url: `/admin-analytic/bookings/${userId}?limit=${pageLimit}&page=${currentPage}`,
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
    getTransactionById: builder.query<any, any>({
      query: (id) => ({
        url: `/admin-analytic/transactions/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetActiveUsersQuery,
  useGetTopCustomersQuery,
  useGetAllBookingQuery,
  useGetBookingByUserIdQuery,
  useGetMostBookedTripsQuery,
  useGetAllTransactionQuery,
  useGetTransactionByIdQuery,
  useGetBookingChartQuery,
  useGetTransactionVolumeQuery,
} = transactionApi;
