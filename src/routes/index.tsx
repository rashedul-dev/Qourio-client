import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import NotFound from "@/components/NotFound";
import About from "@/pages/About";
import ViewParcelDetails from "@/pages/admin/parcels/ViewParcelDetails";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ParcelStatus from "@/pages/sender/ParcelStatus";
import Testimonials from "@/pages/Testimonials";
import TrackParcel from "@/pages/TrackParcel";
import Unauthorized from "@/pages/Unauthorized";
import Verify from "@/pages/Verify";
import type { TRole } from "@/types";
import { Role } from "@/types/user-type";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import {
  ADMIN_DEFAULT_ROUTE,
  RECEIVER_DEFAULT_ROUTE,
  SENDER_DEFAULT_ROUTE,
} from "./constants";
import { receiverSidebarItems } from "./receiverSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Testimonials,
        path: "testimonials",
      },
      {
        Component: TrackParcel,
        path: "trackparcel",
      },
      {
        Component: FAQ,
        path: "faq",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, Role.ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={ADMIN_DEFAULT_ROUTE} /> },
      ...generateRoutes(adminSidebarItems),
      { Component: ViewParcelDetails, path: ":id/details" },
    ],
  },
  {
    Component: withAuth(DashboardLayout, Role.SUPER_ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={ADMIN_DEFAULT_ROUTE} /> },
      ...generateRoutes(adminSidebarItems),
      { Component: ViewParcelDetails, path: ":id/details" },
    ],
  },
  {
    Component: withAuth(DashboardLayout, Role.SENDER as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to={SENDER_DEFAULT_ROUTE} /> },
      ...generateRoutes(senderSidebarItems),
      { Component: ParcelStatus, path: ":id/status" },
    ],
  },
  {
    Component: withAuth(DashboardLayout, Role.RECEIVER as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to={RECEIVER_DEFAULT_ROUTE} /> },
      ...generateRoutes(receiverSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
