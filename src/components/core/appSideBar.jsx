import React from "react";
import { useEffect } from "react";
import { NavMain } from "@/components/core/navigations/nav-main";
import { NavUser } from "@/components/core/navigations/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavPlateform } from "./navigations/nav-plateform";
import { NavManagements } from "./navigations/nav-managements";
import navigationData from "@/app/data/navigation";
import { Link } from "react-router-dom";
import dummyImg from "@/assets/web/dummyImg.webp";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/modules/accounts/store/account.slice";
import { useMemo } from "react";
import mustardLogo from "@/assets/web/mustardLogo2.webp";
import { cn } from "@/lib/utils";

export function AppSidebar({ ...props }) {
  const dispatch = useDispatch();
  const { open } = useSidebar();
  const { account } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Utility for section headers to keep the JSX clean
  // const SectionHeader = ({ title }) => (
  //   <div className="px-4 mb-2 mt-4">
  //     <h2 className="text-[11px] font-bold tracking-[0.15em] text-slate-400/80 uppercase">
  //       {title}
  //     </h2>
  //   </div>
  // );

  const navUser = useMemo(
    () => ({
      name: account?.nickname || "Admin",
      email: account?.email || "admin@keenasmustard.com",
      avatar: account?.avatar?.url || dummyImg,
    }),
    [account],
  );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200 bg-slate-50 backdrop-blur-xl pt-1"
      {...props}
    >
      {/* --- HEADER: Logo & Branding --- */}
      <SidebarHeader className="sticky top-0 z-20 h-16 items-center justify-center bg-slate-50/95 backdrop-blur-sm p-0">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between px-1">
            {/* 2. Agar sidebar open hai tabhi logo dikhega */}
            {open && (
              <SidebarMenuButton
                size="lg"
                asChild
              >
                <Link to="/admin/dashboard" className="flex items-center gap-2">
                  <div className="flex aspect-square items-center justify-center rounded-lg">
                    <img
                      src={mustardLogo}
                      alt="Logo"
                      loading="lazy"
                      className="size-8"
                    />
                  </div>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-extrabold">
                      Keen As <br /> Mustard
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            )}

            {/* 3. Trigger button hamesha dikhega, collapsed mode mein center ho jayega */}
            <SidebarTrigger
              className={cn(
                "-ml-1 mr-2 text-slate-500 hover:bg-slate-100",
                !open && "mx-auto ml-0", // Collapsed hone par center align karne ke liye
              )}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* --- CONTENT: Navigation Sections --- */}
      <SidebarContent className="flex-1 overflow-y-auto scrollbar-thin gap-0 bg-slate-50">
        {/* Overview Section */}
        {navigationData.navMain && <NavMain items={navigationData.navMain} />}

        {/* Management Section */}
        {navigationData.navManagement && (
          <NavManagements items={navigationData.navManagement} />
        )}

        {/* Platform Section */}
        {navigationData.navPlateform && (
          <NavPlateform items={navigationData.navPlateform} />
        )}

        {/* {navigationData.navSecondary && (
          <NavSecondary items={navigationData.navSecondary} />
        )} */}
      </SidebarContent>

      {/* --- FOOTER: User Profile --- */}
      <SidebarFooter className="border border-slate-100 bg-slate-50/50 p-2">
        <div className="rounded-lg border border-brand-aqua bg-white shadow-sm transition-all hover:shadow-md">
          <NavUser user={navUser} />
        </div>
      </SidebarFooter>

      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
