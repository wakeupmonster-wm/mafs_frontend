// src/app/routes/index.js
import { Suspense, lazy } from "react"; // Added Suspense and lazy
import { createBrowserRouter, useParams } from "react-router-dom";
import PrivateRoute from "./privateRoute";

// 1. Layouts (Keep these standard or lazy load them too)
import AdminLayout from "../layouts/AdminLayout";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";

// 2. LAZY LOAD COMPONENTS
const Dashboard = lazy(() => import("@/modules/dashboard/pages/Dashboard"));
const App = lazy(() => import("@/App"));
const NotFoundPage = lazy(() =>
  import("@/modules/not-found/Pages/not-found.page")
);
const PendingVerifications = lazy(() =>
  import("@/modules/users/pages/PendingVerifications")
);
const UserManagementPage = lazy(() =>
  import("@/modules/users/pages/user-management.Page")
);
const ViewProfilePage = lazy(() =>
  import("@/modules/users/pages/view-profile.Page")
);
const EditProfilePage = lazy(() =>
  import("@/modules/users/pages/edit-profile.Page")
);
const ViewPage = lazy(() => import("@/modules/users/pages/viewPage"));

// Giveaway Modules
const GiveawayManagement = lazy(() =>
  import("@/modules/giveaway/pages/GiveawayManagement")
);
const CreatePrize = lazy(() => import("@/modules/giveaway/pages/Prizes"));
const Campaigns = lazy(() => import("@/modules/giveaway/pages/Campaigns"));
const BulkCampaigns = lazy(() =>
  import("@/modules/giveaway/pages/BulkCampaigns")
);
const CampaignWinner = lazy(() =>
  import("@/modules/giveaway/pages/CampaignWinner")
);
const PendingDeliveries = lazy(() =>
  import("@/modules/giveaway/pages/PendingDeliveries")
);

// Support & Reviews
const MyTicketsPage = lazy(() =>
  import("@/modules/support/pages/SupportPages").then((module) => ({
    default: module.MyTicketsPage,
  }))
);
const ContactSupportPage = lazy(() =>
  import("@/modules/support/pages/SupportPages").then((module) => ({
    default: module.ContactSupportPage,
  }))
);
const TicketDetailPage = lazy(() =>
  import("@/modules/support/pages/SupportPages").then((module) => ({
    default: module.TicketDetailPage,
  }))
);

const ReportedProfilesPage = lazy(() =>
  import("@/modules/profileReview/pages/ProfileReviewPages").then((module) => ({
    default: module.ReportedProfilesPage,
  }))
);
const ProfileReviewDetailPage = lazy(() =>
  import("@/modules/profileReview/pages/ProfileReviewPages").then((module) => ({
    default: module.ProfileReviewDetailPage,
  }))
);

const ChatReportedList = lazy(() =>
  import("@/modules/chatManagement/pages/ChatReportedList")
);
const ChatReviewDetail = lazy(() =>
  import("@/modules/chatManagement/pages/ChatReviewDetail")
);

// Auth
const LoginPage = lazy(() =>
  import("@/modules/authentication/pages/login.page")
);
const ForgotPasswordPage = lazy(() =>
  import("@/modules/authentication/pages/forgot-password.page")
);
const RequestResetEmailForm = lazy(() =>
  import("@/modules/authentication/components/request-resetEmail")
);
const VerifyEmailOtp = lazy(() =>
  import("@/modules/authentication/components/verify-emailOTP")
);
const ForgotPasswordForm = lazy(() =>
  import("@/modules/authentication/components/forgotPasswordForm")
);

// CMS & Others
const FAQSPage = lazy(() => import("@/modules/cms/pages/faqs.page"));
const FAQEditView = lazy(() =>
  import("@/modules/cms/components/faqs-edit-view.page")
);
const PrivacyAndPolicyPage = lazy(() =>
  import("@/modules/cms/pages/privacy-policy.page")
);
const TermAndConditionsPage = lazy(() =>
  import("@/modules/cms/pages/terms-conditions.page")
);
const AdminProfile = lazy(() => import("@/modules/setting/AdminProfile.jsx"));
const NotificationManagementPages = lazy(() =>
  import("@/modules/notificationManagement/pages/NotificationManagementPages")
);
const NotificationManagementPage = lazy(() =>
  import("@/modules/notificationManagement/pages/notificationPage")
);
const ReportsProfilesPage = lazy(() =>
  import("@/modules/profileReview/pages/reports.profiles.page")
);
const ProfileReviewPage = lazy(() =>
  import("@/modules/profileReview/pages/profile.review.page")
);

const KYCVerificationPage = lazy(() =>
  import("@/modules/verification/pages/kyc.verification.page")
);

const SupportTicketsPage = lazy(() =>
  import("@/modules/support/pages/supports.page")
);

const ViewTicketDetails = lazy(() =>
  import("@/modules/support/pages/view.ticket.details")
);
const SubscriptionsPage = lazy(() =>
  import("@/modules/subsciptions/pages/subscription.page")
);

const EntitlementPage = lazy(() =>
  import("@/modules/membership/pages/entitlements.page")
);

const ViewSubscriptionsPage = lazy(() =>
  import("@/modules/subsciptions/pages/view.subscriptions.page")
);
const AnalyticsPage = lazy(() =>
  import("@/modules/dashboard/pages/analytics.page")
);

import { PreLoader } from "../loader/preloader";
import ViewSubPage from "@/modules/subsciptions/pages/view.sub.page";

const AccountsPage = lazy(() =>
  import("@/modules/accounts/page/accounts.page")
);

const PrizePage = lazy(() => import("@/modules/giveaway/pages/prizes.page"));
const CampaignsPage = lazy(() =>
  import("@/modules/giveaway/pages/campaigns.page")
);
const BulkCampaignsPage = lazy(() =>
  import("@/modules/giveaway/pages/bulk.campaign.page")
);
const PendingDeliveriesPage = lazy(() =>
  import("@/modules/giveaway/pages/pending.deliveries.page")
);
const ParticipantsPage = lazy(() =>
  import("@/modules/giveaway/pages/participants.page")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PreLoader />}>
        <RootLayout />
      </Suspense>
    ),
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
              { path: "*", element: <NotFoundPage /> },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <Suspense fallback={<PreLoader />}>
          <AdminLayout />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <NotFoundPage /> },

      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PreLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },

      { path: "analytics", element: <AnalyticsPage /> },

      { path: "kpi", element: <>KPI's</> },

      { path: "quick-actions", element: <>Quick Actions</> },

      {
        path: "management",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PreLoader />}>
                <NotFoundPage />
              </Suspense>
            ),
          },
          {
            path: "users-management",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <UserManagementPage />
                  </Suspense>
                ),
              },
              {
                path: "view-profile",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <ViewProfilePage />
                  </Suspense>
                ),
              },
              {
                path: "view-page",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <ViewPage />
                  </Suspense>
                ),
              },
              {
                path: "edit-profile",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <EditProfilePage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "pending-verifications",
            element: (
              <Suspense fallback={<PreLoader />}>
                <PendingVerifications />
              </Suspense>
            ),
          },

          // ======================================================
          {
            path: "kyc-verifications",
            element: (
              <Suspense fallback={<PreLoader />}>
                <KYCVerificationPage />
              </Suspense>
            ),
          },
          {
            path: "entitlements",
            element: (
              <Suspense fallback={<PreLoader />}>
                <EntitlementPage />
              </Suspense>
            ),
          },
          {
            path: "giveaway",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <GiveawayManagement />
                  </Suspense>
                ),
              },
              {
                path: "prizes",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <PrizePage />
                  </Suspense>
                ),
              },
              {
                path: "campaigns",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <CampaignsPage />
                  </Suspense>
                ),
              },
              {
                path: "bulk-campaigns",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <BulkCampaignsPage />
                  </Suspense>
                ),
              },
              {
                path: "winner",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <PendingDeliveriesPage />
                  </Suspense>
                ),
              },
              {
                path: "pending-deliveries",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <PendingDeliveriesPage />
                  </Suspense>
                ),
              },
              {
                path: "participants",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <ParticipantsPage />
                  </Suspense>
                ),
              },
            ],
          },
          // {
          //   path: "support",
          //   children: [
          //     { index: true, element: <MyTicketsPage /> },
          //     {
          //       path: "contact",
          //       element: (
          //         <Suspense fallback={<PreLoader />}>
          //           <ContactSupportPage />
          //         </Suspense>
          //       ),
          //     },
          //     {
          //       path: "ticket/:ticketId",
          //       element: (
          //         <Suspense fallback={<PreLoader />}>
          //           <TicketWrapper />
          //         </Suspense>
          //       ),
          //     },
          //   ],
          // },

          // ==============================^
          {
            path: "support",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <SupportTicketsPage />
                  </Suspense>
                ),
              },
              {
                path: "view-ticket/:ticketId",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <ViewTicketDetails />
                  </Suspense>
                ),
              },
            ],
          },
          // ==============================^
          // {
          //   path: "profile-review",
          //   children: [
          //     { index: true, element: <ReportedProfilesPage /> },
          //     { path: ":userId", element: <ProfileReviewWrapper /> },
          //   ],
          // },
          // ==============================^
          {
            path: "profile-reports",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <ReportsProfilesPage />
                  </Suspense>
                ),
              },
              {
                path: "review/:userId",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <ProfileReviewPage />
                  </Suspense>
                ),
              },
            ],
          },
          // ==============================^
          {
            path: "chat",
            children: [
              { index: true, element: <ChatReportedList /> },
              { path: ":matchId", element: <ChatReviewWrapper /> },
            ],
          },
          { path: "notifications", element: <NotificationManagementPages /> },
          {
            path: "all-notifications",
            element: (
              <Suspense fallback={<PreLoader />}>
                <NotificationManagementPage />
              </Suspense>
            ),
          },
          {
            path: "subscription-management",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <SubscriptionsPage />
                  </Suspense>
                ),
              },
              {
                path: "view-subscription/:userId",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <ViewSubscriptionsPage />
                  </Suspense>
                ),
              },
              {
                path: "view-sub/:userId",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <ViewSubPage />
                  </Suspense>
                ),
              },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },

      {
        path: "membership",
        children: [
          { index: true, element: <NotFoundPage /> },
          { path: "billing", element: <>Billings</> },
          { path: "subscriptions", element: <>View Subscriptions</> },
          { path: "pricing", element: <>Configure SKUs & Pricing</> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },

      {
        path: "report-moderation",
        children: [
          { index: true, element: <NotFoundPage /> },
          { path: "report-queue", element: <>Report Queue</> },
          { path: "block-banned-users", element: <>Blocked & Banned Users</> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },

      {
        path: "cms",
        children: [
          { index: true, element: <NotFoundPage /> },
          {
            path: "faqs",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <FAQSPage />
                  </Suspense>
                ),
              },
              { path: "edit", element: <FAQEditView /> },
              { path: "edit/:id", element: <FAQEditView /> },
            ],
          },
          {
            path: "privacy-policy",
            element: (
              <Suspense fallback={<PreLoader />}>
                <PrivacyAndPolicyPage />
              </Suspense>
            ),
          },
          {
            path: "terms-conditions",
            element: (
              <Suspense fallback={<PreLoader />}>
                <TermAndConditionsPage />
              </Suspense>
            ),
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },

      { path: "settings", element: <AdminProfile /> },
      { path: "get-help", element: <>Get-Help</> },
      { path: "search", element: <>Search</> },
      {
        path: "accounts",
        element: (
          <Suspense fallback={<PreLoader />}>
            <AccountsPage />
          </Suspense>
        ),
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

// eslint-disable-next-line react-refresh/only-export-components
function TicketWrapper() {
  const { ticketId } = useParams();
  return <TicketDetailPage ticketId={ticketId} />;
}

// eslint-disable-next-line react-refresh/only-export-components
function ProfileReviewWrapper() {
  const { userId } = useParams();
  return <ProfileReviewDetailPage userId={userId} />;
}

// eslint-disable-next-line react-refresh/only-export-components
function ChatReviewWrapper() {
  const { matchId } = useParams();
  return <ChatReviewDetail matchId={matchId} />;
}
