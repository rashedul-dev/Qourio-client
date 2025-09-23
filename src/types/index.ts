import type { ComponentType } from "react";
import type { Role } from "./user-type";

export type { ILogin, ISendOtp, IVerifyOtp } from "./auth-type";
export type { IParcelTrackData, IStatusLog } from "./parcel-type";
export type { IParcel, IParcelParams } from "./sender-parcel-type";
export type { IUser, IUserParams } from "./user-type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: IMeta;
  data: T;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface IAnalyticsData {
  totalParcel?: number;
  totalParcelByStatus?: Array<{
    _id: string;
    count: number;
  }>;
  parcelCreatedInLast7Days?: number;
  parcelCreatedInLast30Days?: number;
  parcelPerType?: Array<{
    _id: string;
    count: number;
  }>;
  parcelPerShippingType?: Array<{
    _id: string;
    count: number;
  }>;
}

export type TRole = keyof typeof Role;
