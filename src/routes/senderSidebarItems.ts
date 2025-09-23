import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const MyParcels = lazy(() => import("@/pages/sender/MyParcels"));

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Parcels",
    items: [
      {
        title: "My Parcels",
        url: "me",
        component: MyParcels,
      },
      // {
      //   title: "Status",
      //   url: ":id/status-log",
      //   component: ParcelStatus,
      // },
    ],
  },
];
