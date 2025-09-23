import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { receiverSidebarItems } from "@/routes/receiverSidebarItems";
import { senderSidebarItems } from "@/routes/senderSidebarItems";
import type { TRole } from "@/types";
import { Role } from "@/types/user-type";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case Role.SUPER_ADMIN:
      return [...adminSidebarItems];
    case Role.ADMIN:
      return [...adminSidebarItems];
    case Role.SENDER:
      return [...senderSidebarItems];

    case Role.RECEIVER:
      return [...receiverSidebarItems];

    // case Role.DELIVERY_PERSONNEL:
    //   return [...senderSidebarItems];
    default:
      return [];
  }
};
