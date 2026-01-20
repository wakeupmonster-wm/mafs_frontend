<<<<<<< Updated upstream
// src/app/routes/index.jsx
import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { PATHS, ADMIN_ROLES } from "./routeConfig";
import { Spinner } from "@/components/ui/spinner";
=======
// src/app/routes/index.js
import { createBrowserRouter, useParams } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "@/modules/dashboard/pages/Dashboard";
import App from "@/App";
import NotFoundPage from "@/modules/not-found/Pages/not-found.page";
import UserManagementPage from "@/modules/users/pages/user-management";
import PendingVerifications from "@/modules/users/pages/PendingVerifications";
import Campaigns from "@/modules/giveaway/pages/Campaigns";
import CreatePrize from "@/modules/giveaway/pages/Prizes";
import GiveawayManagement from "@/modules/giveaway/pages/GiveawayManagement";
import {
  ContactSupportPage,
  MyTicketsPage,
  TicketDetailPage,
} from "@/modules/support/pages/SupportPages";
import ForgotPasswordPage from "@/modules/authentication/pages/forgot-password.page";
import LoginPage from "@/modules/authentication/pages/login.page";
import AuthLayout from "../layouts/AuthLayout";
import RequestResetEmailForm from "@/modules/authentication/components/request-resetEmail";
import VerifyEmailOtp from "@/modules/authentication/components/verify-emailOTP";
import ForgotPasswordForm from "@/modules/authentication/components/forgotPasswordForm";
import BusinessPage from "@/modules/businesses/pages/businesses.page";
import ViewProfilePage from "@/modules/users/pages/view-profile.Page";
import EditProfilePage from "@/modules/users/pages/edit-profile.Page";
>>>>>>> Stashed changes

// Lazy pages
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const LoginPage = lazy(() => import("@/pages/auth/Login"));
const DashboardPage = lazy(() => import("@/pages/admin/Dashboard"));
const UsersPage = lazy(() => import("@/pages/admin/Users"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));

/**
 * Simple auth helpers used by loaders
 * Adjust to integrate with your token validation / user fetching
 */
const getToken = () => localStorage.getItem("admin_access_token");
const getUser = () => {
  const raw = localStorage.getItem("admin_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/**
 * requireAuthLoader:
 * returns a loader function that Data Router will call before rendering the route.
 * - If not authed -> redirect to login
 * - If allowedRoles is provided and user.role not allowed -> redirect (or throw)
 */
const requireAuthLoader =
  (allowedRoles = []) =>
  async () => {
    const token = getToken();
    if (!token) {
      // pass current location in `search` if you want to redirect back after login
      throw redirect(`${PATHS.LOGIN}`);
    }

    // If you want to validate token with server, do that here (fetch / validate).
    // For demo: read user from localStorage
    const user = getUser();

    if (allowedRoles.length > 0) {
      if (!user || !allowedRoles.includes(user.role)) {
        // unauthorized — either redirect or throw an error to show ErrorPage
        throw redirect("/"); // or throw new Response("Unauthorized", { status: 403 })
      }
    }

    // Return some data to the route (accessible via useLoaderData)
    return { user };
  };

/** Routes config for createBrowserRouter (Data Router)
 * This example shows:
 * - Root layout with public pages
 * - Admin layout with a loader (auth guard) applied
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <div>Home</div> },
      {
        path: PATHS.LOGIN,
        element: (
          <Suspense fallback={<Spinner />}>
            <LoginPage />
          </Suspense>
        ),
      },

      // ADMIN area (protected)
      {
        path: "/admin",
        element: (
          <Suspense fallback={<Spinner />}>
            <AdminLayout />
          </Suspense>
        ),
        // loader applied to all child admin routes
        loader: requireAuthLoader(), // or pass allowed roles: requireAuthLoader([ADMIN_ROLES.SUPER_ADMIN])
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spinner />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<Spinner />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: "users",
            element: (
              <Suspense fallback={<Spinner />}>
                <UsersPage />
              </Suspense>
            ),
            // If a specific route needs role restriction you can add its own loader:
            // loader: requireAuthLoader([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.MODERATOR])
          },
        ],
      },

      // catch-all 404
      {
        path: "*",
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
<<<<<<< Updated upstream
=======
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <NotFoundPage /> },

      { path: "dashboard", element: <Dashboard /> },

      { path: "analytics", element: <>Analytics</> },

      { path: "kpi", element: <>KPI's</> },

      { path: "quick-actions", element: <>Quick Actions</> },

      {
        path: "management",
        children: [
          { index: true, element: <NotFoundPage /> },

          { path: "users-management", element: <UserManagementPage /> },

          {
            path: "business-management",
            children: [
              { index: true, element: <BusinessPage /> },
              { path: "view-profile", element: <ViewProfilePage /> },
              { path: "edit-profile", element: <EditProfilePage /> },
            ],
          },

          { path: "pending-verifications", element: <PendingVerifications /> },

          {
            path: "giveaway",
            children: [
              { index: true, element: <GiveawayManagement /> },

              { path: "prizes", element: <CreatePrize /> },
              { path: "campaigns", element: <Campaigns /> },
            ],
          },
          {
            path: "support",
            children: [
              { index: true, element: <MyTicketsPage /> },
              { path: "contact", element: <ContactSupportPage /> },
              { path: "ticket/:ticketId", element: <TicketWrapper /> },
            ],
          },

          { path: "offer-management", element: <>Offer Management</> },
        ],
      },

      {
        path: "membership",
        children: [
          { index: true, element: <NotFoundPage /> },

          { path: "billing", element: <>Billings</> },

          { path: "subscriptions", element: <>View Subscriptions</> },

          { path: "entitlements", element: <>Manual Entitlements & Trials</> },

          { path: "pricing", element: <>Configure SKUs & Pricing</> },
        ],
      },
      {
        path: "report-moderation",
        children: [
          { index: true, element: <NotFoundPage /> },
          { path: "report-queue", element: <>Report Queue</> },
          { path: "block-banned-users", element: <>Blocked & Banned Users</> },
        ],
      },
      {
        path: "cms",
        children: [
          { index: true, element: <NotFoundPage /> },
          { path: "faqs", element: <>FAQ's</> },
          { path: "privacy-policy", element: <>Privacy And Policy</> },
          { path: "terms-conditions", element: <>Terms & Conditions</> },
        ],
      },
      { path: "settings", element: <>Settings</> },
      { path: "get-help", element: <>Get-Help</> },
      { path: "search", element: <>Search</> },
      { path: "accounts", element: <>Accounts</> },

      // { path: "", element: <Navigate to="dashboard" replace /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
>>>>>>> Stashed changes
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
