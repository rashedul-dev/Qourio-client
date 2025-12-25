import Loading from "@/components/Loading";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { Role } from "@/types/user-type";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import { ADMIN_DEFAULT_ROUTE, RECEIVER_DEFAULT_ROUTE, SENDER_DEFAULT_ROUTE } from "@/routes/constants";

// Helper function to get default route based on role
const getDefaultRouteByRole = (role: string) => {
  switch (role) {
    case Role.ADMIN:
    case Role.SUPER_ADMIN:
      return ADMIN_DEFAULT_ROUTE;
    case Role.SENDER:
      return SENDER_DEFAULT_ROUTE;
    case Role.RECEIVER:
      return RECEIVER_DEFAULT_ROUTE;
    default:
      return "/";
  }
};

export const withGuest = (Component: ComponentType) => {
  return function GuestWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);

    // Show loading while checking authentication
    if (isLoading) {
      return <Loading />;
    }

    // If user is authenticated, redirect to their default route
    if (data?.data?.email && data?.data?.role) {
      const defaultRoute = getDefaultRouteByRole(data.data.role);
      return <Navigate to={defaultRoute} replace />;
    }

    // If not authenticated, show the component (login/register)
    return <Component />;
  };
};
