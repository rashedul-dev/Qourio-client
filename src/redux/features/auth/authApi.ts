import { baseApi } from "@/redux/api/baseApi";
import { ILogin, IResponse } from "@/types";
import { ILoginResponse } from "@/types/auth-type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponse>, ILogin>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data, 
      }),
      invalidatesTags: ["USER"], 
    }),
    logout: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER", "SENDER_PARCEL"],
    }),
    refreshToken: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
    changePassword: builder.mutation<IResponse<void>, Partial<{ oldPassword: string; newPassword: string }>>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
    forgotPassword: builder.mutation<IResponse<void>, Partial<{ email: string }>>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data,
      }),
    }),
    resetPassword: builder.mutation<IResponse<void>, Partial<{ password: string; token: string }>>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data,
      }),
    }),
    sendOtp: builder.mutation<IResponse<void>, Partial<{ name: string; email: string }>>({
      query: (data) => ({
        url: "/otp/send",
        method: "POST",
        data,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<void>, Partial<{ email: string; otp: string }>>({
      query: (data) => ({
        url: "/otp/verify",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
