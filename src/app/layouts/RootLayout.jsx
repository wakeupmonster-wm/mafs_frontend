import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/modules/authentication/store/auth.slice";
import { Heart, ShieldCheck, LogOut } from "lucide-react";
import { ROLES } from "@/constants/roles";

export default function RootLayout() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Public Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-pink-600 fill-pink-600" />
              <span className="text-xl font-black tracking-tight text-gray-900">
                MAFS<span className="text-pink-600">.</span>
              </span>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  {/* ROLE-BASED NAVIGATION: Only Admin sees the "Dashboard" link */}
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
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth/login"
                    // className="px-5 py-2 text-sm font-semibold text-gray-700 hover:text-pink-600" hover:text-brand-aqua
                    className="bg-brand-aqua px-5 py-2 text-sm font-bold text-white rounded-full hover:bg-grey-800 transition-all shadow-lg shadow-gray-200"
                  >
                    Log-In
                  </Link>
                  {/* <Link
                    to="/signup"
                    className="px-5 py-2 text-sm font-bold bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                  >
                    Join Now
                  </Link> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-50 border-t py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 MAFS Dating App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}