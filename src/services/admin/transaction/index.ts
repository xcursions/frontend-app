import { authApi } from "@/services/auth";
import type { ApiResponseTypes } from "@/types/ApiResponseType";

import type { CouponResponse, FundUserPayload } from "../payload";

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
    fundUser: builder.mutation<
      ApiResponseTypes<unknown>,
      { data: FundUserPayload; id: string }
    >({
      query: ({ id, data }) => ({
        url: `/admin-analytic/wallet-credits/users/${id}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    createCoupon: builder.mutation<
      ApiResponseTypes<unknown>,
      {
        code: string;
        type: string;
        numberOfUses: number;
        value: number;
        expirationDate: string;
      }
    >({
      query: (data) => ({
        url: "/discount/discounts",
        method: "POST",
        body: { ...data },
      }),
    }),
    editCoupon: builder.mutation<
      ApiResponseTypes<unknown>,
      {
        id: string;
        data: {
          code: string;
          type: string;
          numberOfUses: number;
          value: number;
          expirationDate: string;
        };
      }
    >({
      query: ({ id, data }) => ({
        url: `/discount/discounts/${id}`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    deleteCoupon: builder.mutation<ApiResponseTypes<unknown>, { id: string }>({
      query: ({ id }) => ({
        url: `/discount/discounts/${id}`,
        method: "DELETE",
      }),
    }),
    getCoupons: builder.query<
      {
        result: CouponResponse[];
        limit: number;
        totalPages: number;
        totalElements: number;
      },
      { pageLimit: number; currentPage: number }
    >({
      query: ({ pageLimit, currentPage }) => ({
        url: `/discount/discounts?limit=${pageLimit}&currentPage=${currentPage}`,
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
  useFundUserMutation,
  useCreateCouponMutation,
  useGetCouponsQuery,
  useEditCouponMutation,
  useDeleteCouponMutation,
} = transactionApi;
