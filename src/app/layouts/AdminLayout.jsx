import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppSidebar } from "@/components/core/appSideBar";
import { SiteHeader } from "@/components/core/siteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ROLES } from "@/constants/roles";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== ROLES.ADMIN) {
    return navigate("/");
  }

  console.log("ROLES.ADMIN: ", ROLES.ADMIN);
  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <SidebarProvider>
      {/* 1. The Sidebar remains fixed on the left */}
      <AppSidebar />
      {/* 2. The Inset area creates the "frame" for your content */}
      <SidebarInset className="flex flex-1 flex-col min-w-0 bg-slate-50/50 overflow-hidden">
        <SiteHeader />

        {/* 3. The Main content area with proper max-width for readability */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background text-foreground font-['Plus_Jakarta_Sans',sans-serif]">
          {/* bg-[#F8FAFC] */}
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
