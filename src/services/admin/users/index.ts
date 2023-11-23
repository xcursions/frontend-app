import { authApi } from "@/services/auth";

export const adminUsersApi = authApi.injectEndpoints({
  // reducerPath: "usersApi",
  // baseQuery: axiosBaseQuery(),
  // tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getAllCustomers: builder.query<any, any>({
      query: ({ pageLimit, currentPage }) => ({
        url: `/admin-analytic/users?limit=${pageLimit}&page=${currentPage}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    updateSingleCustomer: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/admin-analytic/users/${query}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteSingleCustomer: builder.mutation<any, any>({
      query: (query) => ({
        url: `/admin-analytic/users/${query}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    createCustomer: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    getAllTeam: builder.query<any, void>({
      query: () => ({
        url: "/admin-analytic/teams/users",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    createTeam: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin-analytic/teams/users",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    updateTeam: builder.mutation<any, any>({
      query: ({ query, data }) => ({
        url: `/admin-analytic/teams/users/${query}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteTeam: builder.mutation<any, any>({
      query: (query) => ({
        url: `/admin-analytic/teams/users/${query}`,
        method: "DELETE",
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
