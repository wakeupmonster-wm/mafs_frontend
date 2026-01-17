// src/app/routes/index.js
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import RootLayout from "../layouts/RootLayout";

// Modules
import Dashboard from "@/modules/dashboard/pages/Dashboard";
import App from "@/App";
import NotFoundPage from "@/modules/not-found/Pages/not-found.page";
import UserManagementPage from "@/modules/users/pages/user-management";
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
      /*============== FOR APP LANDING PAGES ====================*/
      { index: true, element: <App /> }, // Now renders landing page your stylized hero

      /*============== FOR AUTHENTICATION PAGES ====================*/
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          /*============== '/auth' FOR 404 NOT FOUND PAGES ====================*/
          { index: true, element: <NotFoundPage /> },

          /*============== FOR LOGIN PAGE ====================*/
          { path: "login", element: <LoginPage /> },

          /*============== FOR FORGOT-PASSWORD PAGE ====================*/
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />, // This is the layout/parent
            children: [
              { index: true, element: <RequestResetEmailForm /> }, // The initial "Enter Email" step

              /*============== FOR VERIFY EMAIL PAGE ====================*/
              { path: "verify-email", element: <VerifyEmailOtp /> }, // The "Enter Code" step

              /*============== FOR NEW PASSWORD PAGE ====================*/
              { path: "new-password", element: <ForgotPasswordForm /> }, // The "Set New Password" step
            ],
          },
        ],
      },

      /*============== FOR LOGIN PAGES ====================*/
      // { path: "login", element: <LoginPage /> },

      /*============== FOR LOGIN PAGES ====================*/
      // {
      //   path: "forgot-password",
      //   children: [
      //     /*============== FOR LOGIN PAGES ====================*/
      //     { path: "verify-email", element: <ForgotPasswordPage /> },

      //     /*============== FOR LOGIN PAGES ====================*/
      //     { path: "new-password", element: <Login /> },
      //   ],
      // },

      // { path: "forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
  /*============== '/admin' MOUNT FOR ALL PAGES ====================*/
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      /*============== '/admin' FOR 404 NOT FOUND PAGES ====================*/
      { index: true, element: <NotFoundPage /> },

      /*============== FOR DASHBOARD PAGES ====================*/
      { path: "dashboard", element: <Dashboard /> },

      /*============== FOR DASHBOARD PAGES ====================*/
      { path: "analytics", element: <>Analytics</> },

      /*============== FOR DASHBOARD PAGES ====================*/
      { path: "kpi", element: <>KPI's</> },

      /*============== FOR DASHBOARD PAGES ====================*/
      { path: "quick-actions", element: <>Quick Actions</> },

      /*============== FOR MANAGEMENT PAGES ====================*/
      {
        path: "management",
        children: [
          { index: true, element: <NotFoundPage /> },

          /*============== FOR USER MANAGEMENT PAGE ====================*/
          { path: "users-management", element: <UserManagementPage /> },

          /*============== FOR BUSINESS PAGE ====================*/
          { path: "business-management", element: <>Business Management</> },

          /*============== FOR OFFER PAGE ====================*/
          { path: "offer-management", element: <>Offer Management</> },
        ],
      },

      /*============== FOR MEMBERSHIPS & BILLINGS PAGES ====================*/
      {
        path: "membership",
        children: [
          /*============== '/membership' FOR 404 NOT FOUND PAGES ====================*/
          { index: true, element: <NotFoundPage /> },

          /*============== FOR BILLING PAGE ====================*/
          { path: "billing", element: <>Billings</> },

          /*============== FOR BILLING PAGE ====================*/
          { path: "subscriptions", element: <>View Subscriptions</> },

          /*============== FOR ENTILEMENTS PAGE ====================*/
          { path: "entitlements", element: <>Manual Entitlements & Trials</> },

          /*============== FOR PRICING PAGE ====================*/
          { path: "pricing", element: <>Configure SKUs & Pricing</> },
        ],
      },
      /*============== FOR REPORTS & MODERATION PAGES ====================*/
      {
        path: "report-moderation",
        children: [
          /*============== '/report-moderation' FOR 404 NOT FOUND PAGES ====================*/
          { index: true, element: <NotFoundPage /> },

          /*============== FOR REPORT QUEUE PAGE ====================*/
          { path: "report-queue", element: <>Report Queue</> },

          /*============== FOR BLOCK BANNED USER PAGE ====================*/
          { path: "block-banned-users", element: <>Blocked & Banned Users</> },
        ],
      },
      /*============== FOR MEMBERSHIPS & BILLINGS PAGES ====================*/
      {
        path: "cms",
        children: [
          /*============== '/cms' FOR 404 NOT FOUND PAGES ====================*/
          { index: true, element: <NotFoundPage /> },

          /*============== FOR BILLING PAGE ====================*/
          { path: "faqs", element: <>FAQ's</> },

          /*============== FOR BILLING PAGE ====================*/
          { path: "privacy-policy", element: <>Privacy And Policy</> },

          /*============== FOR BILLING PAGE ====================*/
          { path: "terms-conditions", element: <>Terms & Conditions</> },
        ],
      },
      /*============== FOR ADDITIONAL PAGES ====================*/
      { path: "settings", element: <>Settings</> },
      { path: "get-help", element: <>Get-Help</> },
      { path: "search", element: <>Search</> },

      /*============== FOR PROFILE PAGES ====================*/
      { path: "accounts", element: <>Accounts</> },

      // { path: "", element: <Navigate to="dashboard" replace /> },
    ],
  },
  /*============== FOR NOT-FOUND PAGE, 404 ====================*/
  { path: "*", element: <NotFoundPage /> },
]);
