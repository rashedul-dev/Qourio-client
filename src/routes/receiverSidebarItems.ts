import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const IncomingParcels = lazy(() => import("@/pages/receiver/IncomingParcels"));
const DeliveryHistory = lazy(() => import("@/pages/receiver/DeliveryHistory"));

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Parcels",
    items: [
      {
        title: "Incoming Parcels",
        url: "me/incoming",
        component: IncomingParcels,
      },
      {
        title: "Delivery History",
        url: "me/history",
        component: DeliveryHistory,
      },
    ],
  },
];
