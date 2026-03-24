// RootLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initializeAuth } from "@/modules/authentication/store/auth.slice";
// import { ShieldCheck, LogOut } from "lucide-react";
import { ROLES } from "@/constants/roles";
// import mustardLogo from "@/assets/web/mustardLogo2.webp";

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
    // Agar auth initialized ho chuka hai aur user authenticated hai
    if (initialized && isAuthenticated && user?.role === ROLES.ADMIN) {
      // Check karein ki user abhi kahan hai.
      // Agar wo landing page "/" ya "/auth/login" par hai, tabhi redirect karein.
      if (
        location.pathname === "/" ||
        location.pathname.startsWith("/auth/login")
      ) {
        navigate("/admin/dashboard", { replace: true });
      }
    }
  }, [initialized, isAuthenticated, user, navigate, location.pathname]);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/");
  // };

  {
    /* Public Navigation */
  }
  {
    /* <nav className="border-b border-slate-300 bg-white/80 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo
        {/* Logo Section
        <Link to="/" className="flex items-center gap-2">
          <img
            src={mustardLogo}
            alt="Keen As Mustard Logo"
            className="w-8 h-8"
          />

          <span className="text-xl font-black tracking-tight text-gray-900">
            Keen As Mustard
          </span>
        </Link>

        {/* Right Side Actions
        <div className="flex items-center gap-4">
          {
            isAuthenticated && (
              <>
                {/* ROLE-BASED NAVIGATION: Only Admin sees the "Dashboard" link
                {user?.role === ROLES.ADMIN && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-brand-aqua/50 text-grey-900 hover:text-brand-aqua rounded-full font-bold text-sm hover:bg-brand-aqua/10 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )
            // : (
            //   <div className="flex items-center gap-2">
            //     <Link
            //       to="/auth/login"
            //       // className="px-5 py-2 text-sm font-semibold text-gray-700 hover:text-pink-600" hover:text-brand-aqua
            //       className="bg-brand-aqua px-5 py-2 text-sm font-bold text-white rounded-full hover:bg-grey-800 transition-all shadow-lg shadow-gray-200"
            //     >
            //       Log-In
            //     </Link>
            //     <Link
            //       to="/signup"
            //       className="px-5 py-2 text-sm font-bold bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            //     >
            //       Join Now
            //     </Link>
            //   </div>
            // )
          }
        </div>
      </div>
    </div>
  </nav> */
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Content: flex-1 ensures this fills the space */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer stays at the bottom */}
      <footer className="bg-gray-50 border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Keen As Mustard Dating App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
