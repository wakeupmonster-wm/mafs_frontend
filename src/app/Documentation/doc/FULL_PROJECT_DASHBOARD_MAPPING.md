# Full Project Information & Dashboard Mapping

This document provides a complete breakdown of the MAFS Admin Panel based on all the available modules and routes. It maps out exactly what data, metrics, and insights from **each module** can be aggregated and displayed on the Main Dashboard for maximum administrative efficiency.

---

## 1. User Management & Verification
**Routes:** `/admin/management/users-management`, `/admin/management/pending-verifications` (KYC)
**Domain:** Core user base, profiles, and identity verification.

**Data for Dashboard:**
* **Stat Cards:** Total Platform Users, Monthly Active Users (MAU), Pending KYC Approvals.
* **Charts (Area/Line):** User Registration Growth over the last 30 days.
* **Data Table:** "Recent Signups" or "Pending KYC Feed" for quick approval/rejection.

## 2. Fake Profiles & Content Moderation
**Routes:** `/admin/management/fake-profiles`, `/admin/management/profile-reports`
**Domain:** Platform safety, automated bot detection, and user-submitted reports.

**Data for Dashboard:**
* **Stat Cards:** Auto-Detected Fake Profiles (Today), Open User Reports.
* **Charts (Doughnut):** User Status Distribution (Verified vs. Pending vs. Banned).
* **Data Table (High Priority):** "Red Flag Moderation Queue" showing the most reported users with quick action buttons (Ban/Warn).

## 3. Subscriptions & Transactions
**Routes:** `/admin/management/subscription-management`
**Domain:** Financial core, premium memberships, entitlements, and payment logs.

**Data for Dashboard:**
* **Stat Cards:** Monthly Recurring Revenue (MRR), Total Active Subscribers, Churn Rate.
* **Charts (Bar Chart):** Revenue Breakdown by Subscription Tiers (e.g., Premium vs Gold).
* **Data Table:** "Recent Transactions" highlighting payment successes and failures in real-time.

## 4. Chat & Match Management
**Routes:** `/admin/management/chat`
**Domain:** Monitoring flagged direct messages and conversation safety.

**Data for Dashboard:**
* **Stat Cards:** Reported Conversations Pending Review.
* **Charts (Radar):** Chat Activity Heatmap (When are users most active?).

## 5. Giveaways & Campaigns
**Routes:** `/admin/management/giveaway/*` (Prizes, Campaigns, Participants, Deliveries)
**Domain:** Promotional events, user engagement boosts, and prize logistics.

**Data for Dashboard:**
* **Stat Cards:** Active Campaigns Running, Total Participants this Week, Pending Prize Deliveries.
* **Charts (Line Chart):** User Engagement Spikes correlated with Campaign Launch dates.

## 6. Support Ticketing System
**Routes:** `/admin/management/support`
**Domain:** Customer service, dispute resolution, and billing support.

**Data for Dashboard:**
* **Stat Cards:** Unresolved Open Tickets, Average Response/Resolution Time.
* **Charts (Pie Chart):** Tickets broken down by Category (Billing, Tech Issue, Harassment).

## 7. Global Settings & CMS
**Routes:** `/admin/cms/*`, `/admin/settings/*`, `/admin/all-notifications`
**Domain:** App content (FAQs, T&C), push notifications, Ads, and internal configurations.

**Data for Dashboard:**
* **Stat Cards:** App Storage Usage limit, AdMob Revenue (if applicable).
* **Charts:** Push Notification Engagement Rate (Sent vs. Opened).

## 8. Accounts & Admin Roles
**Routes:** `/admin/accounts`
**Domain:** Internal staff access and audit logging.

**Data for Dashboard:**
* **Data Table/List:** "Active Staff" showing which admins/moderators are currently logged into the system.

---

### 🎨 Strategic Dashboard Layout Suggestion

Using `shadcn` components, the dashboard should not be cluttered. It should act as an **Executive Summary**. here is how it should visually stack:

1. **Top Section (The "At a Glance" Stats):**
   * 4 `Card` components showing: Total Users, MRR, Pending Approvals, Open Tickets.
2. **Middle Section (The "Health" Visualizations):**
   * Left: `ChartAreaInteractive` (User Growth).
   * Right: `BarChart` (Revenue by Subscription).
3. **Bottom Section (The "Live Action" Feed):**
   * A single, powerful `DataTable` using Shadcn Tabs (`<Tabs defaultValue="reports">`).
   * **Tabs include:** [Moderation Queue], [Pending KYC], [Recent Payments]. This saves massive vertical space while giving admins one place to take quick actions.
