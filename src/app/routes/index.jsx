// src/app/routes/index.js
import { createBrowserRouter, useParams } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "@/modules/dashboard/pages/Dashboard";
import App from "@/App";
import NotFoundPage from "@/modules/not-found/Pages/not-found.page";
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
import UserManagementPage from "@/modules/users/pages/user-management.Page";
import FAQSPage from "@/modules/cms/pages/faqs.page";
import PrivacyAndPolicyPage from "@/modules/cms/pages/privacy-policy.page";
import TermAndConditionsPage from "@/modules/cms/pages/terms-conditions.page";
import FAQEditView from "@/modules/cms/components/faqs-edit-view.page";

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

          {
            path: "users-management",
            children: [
              { index: true, element: <UserManagementPage /> },
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
          {
            path: "faqs",
            children: [
              { index: true, element: <FAQSPage /> },
              { path: "edit", element: <FAQEditView /> },
              { path: "edit/:id", element: <FAQEditView /> },
            ],
          },
          { path: "privacy-policy", element: <PrivacyAndPolicyPage /> },
          { path: "terms-conditions", element: <TermAndConditionsPage /> },
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

// eslint-disable-next-line react-refresh/only-export-components
function TicketWrapper() {
  const { ticketId } = useParams();
  return <TicketDetailPage ticketId={ticketId} />;
}
