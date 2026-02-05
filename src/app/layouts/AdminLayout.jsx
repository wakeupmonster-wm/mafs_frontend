import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES } from "@/constants/roles";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/core/appSideBar";
import { SiteHeader } from "@/components/core/siteHeader";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Secondary Security Check
  if (!isAuthenticated || user?.role !== ROLES.ADMIN) {
    return navigate("/");
  }

  console.log(
    "ROLES.ADMIN: ",
    ROLES.ADMIN,
    "isAuthenticated: ",
    isAuthenticated
  );
  return (
    <SidebarProvider
      style={
        {
          // "--sidebar-width": "calc(var(--spacing) * 72)",
          // "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      {/* Sidebar - Desktop & Mobile */}
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
