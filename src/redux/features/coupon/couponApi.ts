import { baseApi } from "@/redux/api/baseApi";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        data,
      }),
    }),
    getAllCoupons: builder.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateCouponMutation, useGetAllCouponsQuery } = couponApi;
