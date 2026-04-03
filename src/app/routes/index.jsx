// src/app/routes/index.js
import { Suspense, lazy } from "react"; // Added Suspense and lazy
import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import PrivateRoute from "./privateRoute";

// 1. Layouts (Keep these standard or lazy load them too)
import AdminLayout from "../layouts/AdminLayout";
import RootLayout from "../layouts/RootLayout";

// 2. LAZY LOAD COMPONENTS
const Dashboard = lazy(() => import("@/modules/dashboard/pages/Dashboard"));
const App = lazy(() => import("@/App"));
const NotFoundPage = lazy(
  () => import("@/modules/not-found/Pages/not-found.page"),
);
const PendingVerifications = lazy(
  () => import("@/modules/users/pages/PendingVerifications"),
);
const UserManagementPage = lazy(
  () => import("@/modules/users/pages/user-management.Page"),
);
const ViewProfilePage = lazy(
  () => import("@/modules/users/pages/view-profile.Page"),
);

// Giveaway Modules
const GiveawayManagement = lazy(
  () => import("@/modules/giveaway/pages/GiveawayManagement"),
);

const ChatReportedList = lazy(
  () => import("@/modules/chatManagement/pages/ChatReportedList"),
);
const ChatReviewDetail = lazy(
  () => import("@/modules/chatManagement/pages/ChatReviewDetail"),
);

// Auth
const LoginPage = lazy(
  () => import("@/modules/authentication/pages/login.page"),
);
const ForgotPasswordPage = lazy(
  () => import("@/modules/authentication/pages/forgot-password.page"),
);
const RequestResetEmailForm = lazy(
  () => import("@/modules/authentication/components/request-resetEmail"),
);
const VerifyEmailOtp = lazy(
  () => import("@/modules/authentication/components/verify-emailOTP"),
);
const ForgotPasswordForm = lazy(
  () => import("@/modules/authentication/components/forgotPasswordForm"),
);

// CMS & Others
const FAQSPage = lazy(() => import("@/modules/cms/pages/faqs.page"));
const FAQEditView = lazy(
  () => import("@/modules/cms/components/faqs-edit-view.page"),
);
const PrivacyAndPolicyPage = lazy(
  () => import("@/modules/cms/pages/privacy-policy.page"),
);
const TermAndConditionsPage = lazy(
  () => import("@/modules/cms/pages/terms-conditions.page"),
);

const NotificationManagementPage = lazy(
  () => import("@/modules/notificationManagement/pages/notificationPage"),
);

const ReportsProfilesPage = lazy(
  () => import("@/modules/profileReview/pages/reports.profiles.page"),
);

const ProfileReviewPage = lazy(
  () => import("@/modules/profileReview/pages/profile.review.page"),
);

const KYCVerificationPage = lazy(
  () => import("@/modules/verification/pages/kyc.verification.page"),
);

const SupportTicketsPage = lazy(
  () => import("@/modules/support/pages/supports.page"),
);

const ViewTicketDetails = lazy(
  () => import("@/modules/support/pages/view.ticket.details"),
);
const SubscriptionsPage = lazy(
  () => import("@/modules/subsciptions/pages/subscription.page"),
);
const SubscriptionDashboardPage = lazy(
  () => import("@/modules/subsciptions/pages/subscription.dashboard"),
);

const EntitlementPage = lazy(
  () => import("@/modules/membership/pages/entitlements.page"),
);

const ViewSubscriptionsPage = lazy(
  () => import("@/modules/subsciptions/pages/view.subscription.detail.page"),
);
const SubscriptionProductsPage = lazy(
  () => import("@/modules/subsciptions/pages/products.page"),
);
const SubscriptionConfigPage = lazy(
  () => import("@/modules/subsciptions/pages/config.page"),
);
const SubscriberManagementPage = lazy(
  () => import("@/modules/subsciptions/pages/subscriber.management.page"),
);
const TransactionsPage = lazy(
  () => import("@/modules/subsciptions/pages/transactions.page"),
);
const AnalyticsPage = lazy(
  () => import("@/modules/dashboard/pages/analytics.page"),
);

const FakeProfileManagementPage = lazy(
  () => import("@/modules/fake-profiles/pages/fake-profile-management.Page"),
);

const AccountsPage = lazy(
  () => import("@/modules/accounts/page/accounts.page"),
);

const PrizePage = lazy(() => import("@/modules/giveaway/pages/prizes.page"));

const CampaignsPage = lazy(
  () => import("@/modules/giveaway/pages/campaigns.page"),
);
const BulkCampaignsPage = lazy(
  () => import("@/modules/giveaway/pages/bulk.campaign.page"),
);
const PendingDeliveriesPage = lazy(
  () => import("@/modules/giveaway/pages/pending.deliveries.page"),
);
const ParticipantsPage = lazy(
  () => import("@/modules/giveaway/pages/participants.page"),
);

import { PreLoader } from "../loader/preloader";
import GeneralPage from "@/modules/settings/pages/general.page";
import SocialMediaPage from "@/modules/settings/pages/social.media.page";
import EmailPage from "@/modules/settings/pages/email.page";
import ADSMobPage from "@/modules/settings/pages/ads.mob.page";
import StoragePage from "@/modules/settings/pages/storage.page";
import NotificationManagementPages from "@/modules/notificationManagement/pages/notificationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PreLoader />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      // { index: true, element: <App /> }, // Now renders landing page your stylized hero
      // 1. Jab koi "/" par aaye, usse redirect kar do login par
      {
        index: true,
        element: (
          <Suspense fallback={<PreLoader />}>
            <Navigate to="/auth/login" replace />
          </Suspense>
        ),
      },
      {
        path: "auth",
        element: <App />,
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
          {
            path: "fake-profiles",
            element: (
              <Suspense fallback={<PreLoader />}>
                <FakeProfileManagementPage />
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
                    <SubscriptionDashboardPage />
                  </Suspense>
                ),
              },
              {
                path: "subscribers",
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
                path: "manage-subscribers",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <SubscriberManagementPage />
                  </Suspense>
                ),
              },
              {
                path: "products",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <SubscriptionProductsPage />
                  </Suspense>
                ),
              },
              {
                path: "config",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <SubscriptionConfigPage />
                  </Suspense>
                ),
              },
              {
                path: "transactions",
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <TransactionsPage />
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
      {
        path: "settings",
        children: [
          { index: true, element: <NotFoundPage /> },
          {
            path: "general",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<PreLoader />}>
                    <GeneralPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "social-media",
            element: (
              <Suspense fallback={<PreLoader />}>
                <SocialMediaPage />
              </Suspense>
            ),
          },
          {
            path: "email",
            element: (
              <Suspense fallback={<PreLoader />}>
                <EmailPage />
              </Suspense>
            ),
          },
          {
            path: "ads-mob",
            element: (
              <Suspense fallback={<PreLoader />}>
                <ADSMobPage />
              </Suspense>
            ),
          },
          {
            path: "storage",
            element: (
              <Suspense fallback={<PreLoader />}>
                <StoragePage />
              </Suspense>
            ),
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
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
function ChatReviewWrapper() {
  const { matchId } = useParams();
  return <ChatReviewDetail matchId={matchId} />;
}
