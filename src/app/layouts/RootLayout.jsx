// RootLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initializeAuth } from "@/modules/authentication/store/auth.slice";
import { ROLES } from "@/constants/roles";

export default function RootLayout() {
  const { isAuthenticated, user, initialized } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Current path check karne ke liye

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (initialized && isAuthenticated && user?.role === ROLES.ADMIN) {
      if (
        location.pathname === "/" ||
        location.pathname.startsWith("/auth/login")
      ) {
        navigate("/admin/dashboard", { replace: true });
      }
    }
  }, [initialized, isAuthenticated, user, navigate, location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* <footer className="bg-gray-50 border-t border-brand-aqua/50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} KEEN AS MUSTARD DATING APP ALL RIGHTS
            RESERVED
          </p>
        </div>
      </footer> */}
    </div>
  );
}
