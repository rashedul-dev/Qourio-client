import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  // Uncomment the following lines if you want to use fetchBaseQuery instead of axiosBaseQuery
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: config.baseUrl,
  //     credentials: "include",
  //   }),
  tagTypes: ["AUTH", "USER", "SENDER_PARCEL", "RECEIVER_PARCEL", "ALL_PARCEL"],
  endpoints: () => ({}),
});
