// /* eslint-disable react-hooks/set-state-in-effect */
// import * as React from "react";
// import { useEffect, useState } from "react";
// import { IconInnerShadowTop } from "@tabler/icons-react";
// import { NavDocuments } from "@/components/core/navigations/navDocuments";
// import { NavMain } from "@/components/core/navigations/nav-main";
// import { NavSecondary } from "@/components/core/navigations/nav-secondary";
// import { NavUser } from "@/components/core/navigations/nav-user";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { NavPlateform } from "./navigations/nav-plateform";
// import { NavManagements } from "./navigations/nav-managements";
// import navigationData from "@/app/data/navigation";
// import { Link } from "react-router";

// export function AppSidebar({ ...props }) {
//     const [navUser, setNavUser] = useState({
//     name: "Admin",
//     email: "",
//     avatar: "",
//   });

//   useEffect(() => {
//     const data = localStorage.getItem("userData");
//     if (data) {
//       const user = JSON.parse(data);
//       setNavUser({
//         name: user.fullName || user.nickname || "Admin",
//         email: user.email || "",
//         avatar: user.photos?.[0] || "",
//       });
//     }
//   }, []);
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       {/* SideBar Top */}
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               asChild
//               className="data-[slot=sidebar-menu-button]:!p-1.5"
//             >
//               <Link to="/admin/dashboard">
//                 <IconInnerShadowTop className="!size-5" />
//                 <span className="text-base font-semibold">MAFS</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       {/* SideBar Middle: Content, Tabs */}
//       <SidebarContent className="gap-0">
//         <NavMain items={navigationData.navMain} />
//         <NavManagements items={navigationData.navManagement} />
//         <NavPlateform items={navigationData.navPlateform} />
//       </SidebarContent>

//       <SidebarFooter>
//         <NavUser user={navUser} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }


/* eslint-disable react-hooks/set-state-in-effect */
import * as React from "react";
import { useEffect, useState } from "react";
import { IconInnerShadowTop, IconSparkles } from "@tabler/icons-react";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavPlateform } from "./navigations/nav-plateform";
import { NavManagements } from "./navigations/nav-managements";
import navigationData from "@/app/data/navigation";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function AppSidebar({ ...props }) {
  const [navUser, setNavUser] = useState({
    name: "Admin",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const user = JSON.parse(data);
      setNavUser({
        name: user.fullName || user.nickname || "Admin",
        email: user.email || "",
        avatar: user.photos?.[0] || "",
      });
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Enhanced SideBar Header with Gradient Logo */}
      <SidebarHeader className="border-b border-sidebar-border bg-gradient-to-b from-sidebar to-sidebar/95">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="group hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <Link to="/admin/dashboard">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl  shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:shadow-blue-500/50 group-hover:scale-105">
                  <img src="/Favicon2.png" alt="" className="size-5" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-bold text-lg tracking-tight">
                    MAFS Admin
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Control Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Enhanced SideBar Content with Sections */}
      <SidebarContent className="gap-0 px-2 py-4">
        {/* Main Navigation Section */}
        {navigationData.navMain && (
          <div className="mb-4">
            <div className="px-3 mb-2">
              <h2 className="px-2 text-[10px] font-bold tracking-wider text-muted-foreground/70 uppercase">
                Overview
              </h2>
            </div>
            <NavMain items={navigationData.navMain} />
          </div>
        )}

        <SidebarSeparator className="mx-3 my-2" />

        {/* Management Section */}
        {navigationData.navManagement && (
          <div className="mb-4">
            <div className="px-3 mb-2">
              <h2 className="px-2 text-[10px] font-bold tracking-wider text-muted-foreground/70 uppercase">
                Management
              </h2>
            </div>
            <NavManagements items={navigationData.navManagement} />
          </div>
        )}

        <SidebarSeparator className="mx-3 my-2" />

        {/* Platform Section */}
        {navigationData.navPlateform && (
          <div className="mb-4">
            <div className="px-3 mb-2">
              <h2 className="px-2 text-[10px] font-bold tracking-wider text-muted-foreground/70 uppercase">
                Platform
              </h2>
            </div>
            <NavPlateform items={navigationData.navPlateform} />
          </div>
        )}

        {/* Documents Section */}
        {navigationData.documents && navigationData.documents.length > 0 && (
          <div className="mb-4">
            <NavDocuments items={navigationData.documents} />
          </div>
        )}

        {/* Secondary Navigation at bottom */}
        {navigationData.navSecondary && navigationData.navSecondary.length > 0 && (
          <div className="mt-auto pt-4">
            <SidebarSeparator className="mx-3 mb-4" />
            <NavSecondary items={navigationData.navSecondary} />
          </div>
        )}
      </SidebarContent>

      {/* Enhanced SideBar Footer */}
      <SidebarFooter className="border-t border-sidebar-border bg-gradient-to-t from-sidebar/50 to-sidebar">
        <NavUser user={navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;