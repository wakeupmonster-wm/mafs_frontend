# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in
  [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev
& build performances. To add it, see
[this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript
with type-aware lint rules enabled. Check out the
[TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
for information on how to integrate TypeScript and
[`typescript-eslint`](https://typescript-eslint.io) in your project.

# 📁 ADMIN Folder Module Structure

```
src/
├── app/                           # App bootstrap & shell
│   ├── context/                   # Theme Dark & Light and Providers
│   │   └── providers.jsx          # / Theme / Toast
│   │
│   ├── layouts/                   # ✅ Single layout source
│   │   ├── RootLayout.jsx        # Public layout (login, landing)
│   │   ├── AdminLayout.jsx       # Admin shell (sidebar + header)
│   │   ├── AuthLayout.jsx        # Auth pages layout (optional)
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── AuditSidebar.jsx
│   │
│   ├── routes/
│   │   ├── index.jsx              # Route definitions
│   │   ├── PrivateRoute.jsx       # RBAC / Auth guard
│   │   └── routeConfig.js         # Route constants
│   │
│   ├── slices/
│   │      └── authSlice.js        # ✅ createAsyncThunk HERE
│   │
│   └── store/                     # ✅ Redux lives here ONLY
│       ├──slices/
│       ├── redux.store.js         # configureStore
│       └── rootReducer.js
│
├── assets/
│
├── components/
│   ├── ui/                        # ShadCN components (Button, Input, Table)
│   └── shared/                    # Smart reusable components
│       ├── DataTable.jsx          # High-level UI (DataTable, ConfirmModal, Sidebar)
│       ├── ConfirmModal.jsx
│       ├── PageHeader.jsx
│       └── EmptyState.jsx
│
├── constants/                     # Enums (Roles, OrderStatuses, Permissions)
│     ├── roles.js
│     ├── permissions.js
│     ├── statuses.js
│     └── featureFlags.js
│
├── hooks/                         # Global hooks (useAuth, useDebounce)
│   ├── useAuth.js
│   ├── useDebounce.js
│   └── usePermissions.js
│
├── modules/                       # 🔥 CORE BUSINESS DOMAINS
│   ├── dashboard/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── components/
│   │   │   ├── KPIStat.jsx
│   │   │   └── ActivityFeed.jsx
│   │   ├── store/
│   │   │   └── dashboard.slice.js
│   │   └── services/
│   │          └── api.js
│   │
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── store/
│   │   │   └── auth.slice.js
│   │   ├── schemas/
│   │   │   └── auth.schema.js
│   │   └── services/
│   │          └── api.js
│   │
│   ├── users/
│   │   ├── pages/
│   │   │   ├── UsersList.jsx
│   │   │   └── UserDetails.jsx
│   │   ├── components/                 # User-specific (UserStatsCard.jsx)
│   │   │   ├── UserTable.jsx
│   │   │   └── UserActions.jsx
│   │   ├── store/
│   │   │   ├── users.slice.js          # userSlice.js (Redux)
│   │   │   └── users.thunks.js
│   │   ├── schemas/
│   │   │   └── user.schema.js          # Zod schemas for User forms
│   │   └── services/                   # API call functions for this module
│   │          └── api.js
│   │
│   ├── membership/                     # Follows the same internal structure
│   ├── billing/                        # Follows the same internal structure
│   ├── subscriptions/                  # Follows the same internal structure
│   ├── businesses/                     # Follows the same internal structure
│   ├── offers/                         # Follows the same internal structure
│   ├── reports/                        # Follows the same internal structure
│   ├── moderation/                     # Follows the same internal structure
│   ├── cms/                            # Follows the same internal structure
│   ├── settings/                       # Follows the same internal structure
│   └── audit-logs/                     # Follows the same internal structure
│
├── schemas/                            # 🌍 GLOBAL ZOD ONLY
│   ├── pagination.schema.js
│   ├── apiResponse.schema.js
│   └── common.schema.js
│
├── services/                           # ✅ SINGLE API ENTRY
│   ├── axios.js                        # Axios instance + interceptors
│   ├── endpoints.js                    # Centralized API routes constants
│   └── errorHandler.js                 # Central error mapping
│
├── styles/
│   └── globals.css
│
├── utils/                             # Helper functions
│   ├── formatCurrency.js
│   ├── dateUtils.js
│   └── permissionUtils.js
│
│
├── main.jsx
└── env.js

```
