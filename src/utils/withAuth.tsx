import Loading from "@/components/Loading";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading, isError } = useGetMeQuery(undefined);
    console.log(data) 

    // Show loading while checking authentication
    if (isLoading) {
      return <Loading />;
    }
    // getting  undefined
    // If there's an error or no user data, redirect to login
    if (isError || !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    // // If role is required and doesn't match, redirect to unauthorized
    if (requiredRole && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
