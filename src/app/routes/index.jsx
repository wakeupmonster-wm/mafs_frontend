// src/app/routes/index.jsx
import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { PATHS, ADMIN_ROLES } from "./routeConfig";
import { Spinner } from "@/components/ui/spinner";

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
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
