import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { NavDocuments } from "@/components/core/navigations/navDocuments";
import { NavMain } from "@/components/core/navigations/nav-main";
import { NavSecondary } from "@/components/core/navigations/nav-secondary";
import { NavUser } from "@/components/core/navigations/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavPlateform } from "./navigations/nav-plateform";
import { NavManagements } from "./navigations/nav-managements";
import navigationData from "@/app/data/navigation";
import { Link } from "react-router";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* SideBar Top */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/admin/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* SideBar Middle: Content, Tabs */}
      <SidebarContent className="gap-0">
        <NavMain items={navigationData.navMain} />
        <NavManagements items={navigationData.navManagement} />
        <NavPlateform items={navigationData.navPlateform} />
        <NavDocuments items={navigationData.documents} />
        <NavSecondary items={navigationData.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* SideBar Bottom: ADMIN profile, logout */}
      <SidebarFooter>
        <NavUser user={navigationData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
