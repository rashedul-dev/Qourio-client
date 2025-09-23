import { baseApi } from "@/redux/api/baseApi";
import { IResponse, IUser, IUserParams } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        data,
      }),
    }),
    getMe: builder.query<{ success: boolean; data: IUser }, void>({
  query: () => ({
    url: "/user/me",
    method: "GET",
  }),
  providesTags: ["USER"],
}),
    getAllUsers: builder.query<IResponse<IUser[]>, IUserParams>({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/user/create-admin",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    createDeliveryPersonnel: builder.mutation({
      query: (data) => ({
        url: "/user/create-delivery-personnel",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateUserById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    blockUserById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}/block-user`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetAllUsersQuery,
  useGetMeQuery,
  useCreateAdminMutation,
  useCreateDeliveryPersonnelMutation,
  useGetUserByIdQuery,
  useBlockUserByIdMutation,
} = userApi;
