// src/app/routes/index.js
import { createBrowserRouter } from "react-router-dom";
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
import ForgotPasswordPage from "@/modules/authentication/pages/forgot-password.page";
import LoginPage from "@/modules/authentication/pages/login.page";
import AuthLayout from "../layouts/AuthLayout";
import RequestResetEmailForm from "@/modules/authentication/components/request-resetEmail";
import VerifyEmailOtp from "@/modules/authentication/components/verify-emailOTP";
import ForgotPasswordForm from "@/modules/authentication/components/forgotPasswordForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> }, // Now renders landing page your stylized hero
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { index: true, element: <NotFoundPage /> },

          { path: "login", element: <LoginPage /> },

          {
            path: "forgot-password",
            element: <ForgotPasswordPage />, // This is the layout/parent
            children: [
              { index: true, element: <RequestResetEmailForm /> }, // The initial "Enter Email" step

              { path: "verify-email", element: <VerifyEmailOtp /> }, // The "Enter Code" step

              { path: "new-password", element: <ForgotPasswordForm /> }, // The "Set New Password" step
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
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

          { path: "pending-verifications", element: <PendingVerifications /> },

            {
          path: "giveaway",
          children: [
            { index: true, element: <GiveawayManagement /> },

            { path: "prizes", element: <CreatePrize /> },
            { path: "campaigns", element: <Campaigns /> },
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
]);
