/* eslint-disable react-hooks/set-state-in-effect */
import * as React from "react";
import { useEffect, useState } from "react";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavPlateform } from "./navigations/nav-plateform";
import { NavManagements } from "./navigations/nav-managements";
import navigationData from "@/app/data/navigation";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import dummyImg from "@/assets/images/dummyImg.jpg";

export function AppSidebar({ ...props }) {
  const [navUser, setNavUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth_user");
    if (data) {
      const user = JSON.parse(data);
      setNavUser({
        name: user.fullName || user.nickname || "Admin",
        email: user.email || "",
        avatar: user.photos?.[0] || dummyImg,
      });
    }
  }, []);

  // Utility for section headers to keep the JSX clean
  const SectionHeader = ({ title }) => (
    <div className="px-4 mb-2 mt-4">
      <h2 className="text-[11px] font-bold tracking-[0.15em] text-slate-400/80 uppercase">
        {title}
      </h2>
    </div>
  );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-300/50 bg-white/80 backdrop-blur-xl pt-2 justify-center"
      {...props}
    >
      {/* --- HEADER: Logo & Branding --- */}
      <SidebarHeader className="h-16 border-b border-slate-100 bg-white/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent p-1"
            >
              <Link to="/admin/dashboard" className="flex items-center gap-3">
                <div className="border text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">
                  <img src="/Favicon2.png" alt="" className="size-5" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-extrabold">
                    MAFS Admin
                  </span>
                  <span className="truncate font-semibold text-[9px]">
                    Control Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* --- CONTENT: Navigation Sections --- */}
      <SidebarContent className="scrollbar-none">
        {/* Overview Section */}
        {navigationData.navMain && (
          <>
            {/* <SectionHeader title="Overview" /> */}
            <NavMain items={navigationData.navMain} />
          </>
        )}

        <Separator />

        {/* Management Section */}
        {navigationData.navManagement && (
          <>
            {/* <SectionHeader title="Management" /> */}
            <NavManagements items={navigationData.navManagement} />
          </>
        )}

        {/* Platform Section */}
        {navigationData.navPlateform && (
          <>
            {/* <SectionHeader title="Platform" /> */}
            <NavPlateform items={navigationData.navPlateform} />
          </>
        )}

        {/* Secondary Navigation (Pinned to bottom if content is short) */}
        {navigationData.navSecondary && (
          <>
            <SidebarSeparator className="mx-4 my-4 opacity-50" />
            <NavSecondary items={navigationData.navSecondary} />
          </>
        )}
      </SidebarContent>

      {/* --- FOOTER: User Profile --- */}
      <SidebarFooter className="border border-slate-100 bg-slate-50/50 p-2">
        <div className="rounded-lg border border-slate-400/60 bg-white shadow-sm transition-all hover:shadow-md">
          <NavUser user={navUser} />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );

  // return (
  //   <Sidebar
  //     collapsible="icon"
  //     className="border-r border-slate-200 bg-white py-2"
  //     {...props}
  //   >
  //     <SidebarHeader className="h-14 border-b border-slate-100 px-4 flex flex-row items-center">
  //       {/* Logo Container is fixed-size to ensure centering in collapsed mode */}
  //       <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 shadow-lg">
  //         <img
  //           src="/Favicon2.png"
  //           alt="M"
  //           className="size-4 brightness-0 invert"
  //         />
  //       </div>
  //       <div className="ml-3 flex flex-col group-data-[collapsible=icon]:hidden">
  //         <span className="text-sm font-bold text-slate-900 leading-none">
  //           MAFS Admin
  //         </span>
  //         <span className="text-[10px] font-medium text-slate-400">
  //           System Control
  //         </span>
  //       </div>
  //     </SidebarHeader>

  //     <SidebarContent className="px-2 py-3 group-data-[collapsible=icon]:px-0">
  //       {/* Navigation groups go here */}
  //       <NavMain items={navigationData.navMain} />
  //       <NavManagements items={navigationData.navManagement} />
  //     </SidebarContent>

  //     <SidebarFooter className="p-2 border-t border-slate-100">
  //       <div className="group-data-[collapsible=icon]:justify-center flex">
  //         <NavUser user={navUser} />
  //       </div>
  //     </SidebarFooter>
  //   </Sidebar>
  // );
}
