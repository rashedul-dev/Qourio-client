import { ParcelStatus } from "@/types/sender-parcel-type";
import { IsActive } from "@/types/user-type";

export type StatusType = ParcelStatus;
export type UserStatusType = IsActive;

const lightColors: Record<string, string> = {
  // Parcel Status colors
  [ParcelStatus.DELIVERED]:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",

  [ParcelStatus.IN_TRANSIT]:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  [ParcelStatus.DISPATCHED]:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-800",
  [ParcelStatus.PICKED]:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",

  [ParcelStatus.APPROVED]:
    "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800",
  [ParcelStatus.REQUESTED]:
    "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800",
  [ParcelStatus.RESCHEDULED]:
    "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800",
  [ParcelStatus.FLAGGED]:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800",

  [ParcelStatus.RETURNED]:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  [ParcelStatus.CANCELLED]:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  [ParcelStatus.BLOCKED]: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",

  [ParcelStatus.OUT_FOR_DELIVERY]:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  [ParcelStatus.FAILED_ATTEMPT]:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800",
  [ParcelStatus.LOST]: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  [ParcelStatus.DAMAGED]: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  [ParcelStatus.RECEIVED]:
    "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800",
  [ParcelStatus.PENDING]:
    "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800",

  // User status colors
  ACTIVE: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  INACTIVE:
    "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800",
  BLOCKED: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",

  // Default fallback
  default: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800",
};

// Get HEX color
export const getStatusHexColor = (status: StatusType | UserStatusType): string => {
  const hexColors: Record<string, string> = {
    [ParcelStatus.DELIVERED]: "#22c55e",
    [ParcelStatus.IN_TRANSIT]: "#3b82f6",
    [ParcelStatus.DISPATCHED]: "#8b5cf6",
    [ParcelStatus.PICKED]: "#f59e0b",

    [ParcelStatus.APPROVED]: "#eab308",
    [ParcelStatus.REQUESTED]: "#64748b",
    [ParcelStatus.RESCHEDULED]: "#6366f1",
    [ParcelStatus.FLAGGED]: "#ea580c",

    [ParcelStatus.RETURNED]: "#ef4444",
    [ParcelStatus.CANCELLED]: "#dc2626",
    [ParcelStatus.BLOCKED]: "#991b1b",

    [ParcelStatus.OUT_FOR_DELIVERY]: "#22c55e",
    [ParcelStatus.FAILED_ATTEMPT]: "#ea580c",
    [ParcelStatus.LOST]: "#b91c1c",
    [ParcelStatus.DAMAGED]: "#7f1d1d",
    [ParcelStatus.RECEIVED]: "#14b8a6",
    [ParcelStatus.PENDING]: "#64748b",

    ACTIVE: "#22c55e",
    INACTIVE: "#eab308",
    BLOCKED: "#dc2626",

    default: "#64748b",
  };

  return hexColors[status] || hexColors.default;
};

// Get status color classes (badges/UI)
export const getStatusColor = (status: StatusType | string): string => {
  return lightColors[status] || lightColors.default;
};

// Get user status color classes
export const getUserIsActiveStatusColor = (status: UserStatusType | string): string => {
  return lightColors[status] || lightColors.default;
};

// Get status icon color
export const getStatusIconColor = (status: StatusType | UserStatusType): string => {
  const iconColors: Record<string, string> = {
    [ParcelStatus.DELIVERED]: "text-green-600 dark:text-green-400",
    [ParcelStatus.IN_TRANSIT]: "text-blue-600 dark:text-blue-400",
    [ParcelStatus.DISPATCHED]: "text-violet-600 dark:text-violet-400",
    [ParcelStatus.PICKED]: "text-amber-600 dark:text-amber-400",

    [ParcelStatus.APPROVED]: "text-yellow-600 dark:text-yellow-400",
    [ParcelStatus.REQUESTED]: "text-slate-600 dark:text-slate-400",
    [ParcelStatus.RESCHEDULED]: "text-indigo-600 dark:text-indigo-400",
    [ParcelStatus.FLAGGED]: "text-orange-600 dark:text-orange-400",

    [ParcelStatus.RETURNED]: "text-red-600 dark:text-red-400",
    [ParcelStatus.CANCELLED]: "text-red-600 dark:text-red-400",
    [ParcelStatus.BLOCKED]: "text-red-600 dark:text-red-400",

    [ParcelStatus.OUT_FOR_DELIVERY]: "text-green-600 dark:text-green-400",
    [ParcelStatus.FAILED_ATTEMPT]: "text-orange-600 dark:text-orange-400",
    [ParcelStatus.LOST]: "text-red-700 dark:text-red-400",
    [ParcelStatus.DAMAGED]: "text-red-800 dark:text-red-400",
    [ParcelStatus.RECEIVED]: "text-teal-600 dark:text-teal-400",
    [ParcelStatus.PENDING]: "text-slate-600 dark:text-slate-400",

    ACTIVE: "text-green-600 dark:text-green-400",
    INACTIVE: "text-yellow-600 dark:text-yellow-400",
    BLOCKED: "text-red-600 dark:text-red-400",

    default: "text-slate-600 dark:text-slate-400",
  };

  return iconColors[status] || iconColors.default;
};

// Background only
export const getStatusBgColor = (status: StatusType | UserStatusType): string => {
  const bgColors: Record<string, string> = {
    [ParcelStatus.DELIVERED]: "bg-green-50 dark:bg-green-950",
    [ParcelStatus.IN_TRANSIT]: "bg-blue-50 dark:bg-blue-950",
    [ParcelStatus.DISPATCHED]: "bg-violet-50 dark:bg-violet-950",
    [ParcelStatus.PICKED]: "bg-amber-50 dark:bg-amber-950",

    [ParcelStatus.APPROVED]: "bg-yellow-50 dark:bg-yellow-950",
    [ParcelStatus.REQUESTED]: "bg-slate-50 dark:bg-slate-950",
    [ParcelStatus.RESCHEDULED]: "bg-indigo-50 dark:bg-indigo-950",
    [ParcelStatus.FLAGGED]: "bg-orange-50 dark:bg-orange-950",

    [ParcelStatus.RETURNED]: "bg-red-50 dark:bg-red-950",
    [ParcelStatus.CANCELLED]: "bg-red-50 dark:bg-red-950",
    [ParcelStatus.BLOCKED]: "bg-red-50 dark:bg-red-950",

    [ParcelStatus.OUT_FOR_DELIVERY]: "bg-green-50 dark:bg-green-950",
    [ParcelStatus.FAILED_ATTEMPT]: "bg-orange-50 dark:bg-orange-950",
    [ParcelStatus.LOST]: "bg-red-50 dark:bg-red-950",
    [ParcelStatus.DAMAGED]: "bg-red-50 dark:bg-red-950",
    [ParcelStatus.RECEIVED]: "bg-teal-50 dark:bg-teal-950",
    [ParcelStatus.PENDING]: "bg-slate-50 dark:bg-slate-950",

    ACTIVE: "bg-green-50 dark:bg-green-950",
    INACTIVE: "bg-yellow-50 dark:bg-yellow-950",
    BLOCKED: "bg-red-50 dark:bg-red-950",

    default: "bg-slate-50 dark:bg-slate-950",
  };

  return bgColors[status] || bgColors.default;
};

// Text only
export const getStatusTextColor = (status: StatusType | UserStatusType): string => {
  const textColors: Record<string, string> = {
    [ParcelStatus.DELIVERED]: "text-green-700 dark:text-green-400",
    [ParcelStatus.IN_TRANSIT]: "text-blue-700 dark:text-blue-400",
    [ParcelStatus.DISPATCHED]: "text-violet-700 dark:text-violet-400",
    [ParcelStatus.PICKED]: "text-amber-700 dark:text-amber-400",

    [ParcelStatus.APPROVED]: "text-yellow-700 dark:text-yellow-400",
    [ParcelStatus.REQUESTED]: "text-slate-700 dark:text-slate-400",
    [ParcelStatus.RESCHEDULED]: "text-indigo-700 dark:text-indigo-400",
    [ParcelStatus.FLAGGED]: "text-orange-700 dark:text-orange-400",

    [ParcelStatus.RETURNED]: "text-red-700 dark:text-red-400",
    [ParcelStatus.CANCELLED]: "text-red-700 dark:text-red-400",
    [ParcelStatus.BLOCKED]: "text-red-700 dark:text-red-400",

    [ParcelStatus.OUT_FOR_DELIVERY]: "text-green-700 dark:text-green-400",
    [ParcelStatus.FAILED_ATTEMPT]: "text-orange-700 dark:text-orange-400",
    [ParcelStatus.LOST]: "text-red-800 dark:text-red-400",
    [ParcelStatus.DAMAGED]: "text-red-900 dark:text-red-400",
    [ParcelStatus.RECEIVED]: "text-teal-700 dark:text-teal-400",
    [ParcelStatus.PENDING]: "text-slate-700 dark:text-slate-400",

    ACTIVE: "text-green-700 dark:text-green-400",
    INACTIVE: "text-yellow-700 dark:text-yellow-400",
    BLOCKED: "text-red-700 dark:text-red-400",

    default: "text-slate-700 dark:text-slate-400",
  };

  return textColors[status] || textColors.default;
};
