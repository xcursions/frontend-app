import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/api/baseQuery";

export const adminUsersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getAllCustomers: builder.query<any, any>({
      query: ({ pageLimit, currentPage }) => ({
        url: `/admin-analytic/users?limit=${pageLimit}&page=${currentPage}`,
        method: "get",
      }),
      providesTags: ["Admin"],
    }),
    updateSingleCustomer: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/admin-analytic/users/${query}`,
        method: "put",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteSingleCustomer: builder.mutation<any, any>({
      query: (query) => ({
        url: `/admin-analytic/users/${query}`,
        method: "delete",
      }),
      invalidatesTags: ["Admin"],
    }),
    createCustomer: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/register",
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getAllTeam: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/teams/users",
        method: "get",
      }),
      providesTags: ["Admin"],
    }),
    createTeam: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin-analytic/teams/users",
        method: "post",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateTeam: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/admin-analytic/teams/users/${query}`,
        method: "put",
        data,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteTeam: builder.mutation<any, any>({
      query: (query) => ({
        url: `/admin-analytic/teams/users/${query}`,
        method: "delete",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useDeleteSingleCustomerMutation,
  useGetAllCustomersQuery,
  useGetAllTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useUpdateSingleCustomerMutation,
} = adminUsersApi;
