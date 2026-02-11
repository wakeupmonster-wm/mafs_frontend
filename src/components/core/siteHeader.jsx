import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme.Toggle";

// export function SiteHeader() {
//   return (
//     <header
//       className=" flex shrink-0 items-center gap-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0.5 z-40 h-[var(--header-height)] rounded-tl-lg border border-black bg-background transition-[width,height] ease-linear
//         group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]"
//     >
//       {/* // <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"> */}
//       <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6 py-2">
//         {/* <div className="flex items-center gap-2 px-4"> */}
//         <div className="flex items-center">
//           <SidebarTrigger className="-ml-1" />
//           <Separator
//             orientation="vertical"
//             className="mx-2 data-[orientation=vertical]:h-4"
//           />
//           <h1 className="text-base font-medium">Admin</h1>
//         </div>

//         {/* <div className="ml-auto flex items-center gap-2">
//           <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
//             <a
//               href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               GitHubh
//             </a>
//           </Button>
//         </div> */}
//       </div>
//     </header>
//   );
// }

  export function SiteHeader() {
    return (
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b bg-white/60 backdrop-blur-md px-4 transition-all">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Sidebar Trigger for Mobile & Desktop collapse */}
            <SidebarTrigger className="-ml-1 text-slate-500 hover:bg-slate-100" />
            <Separator orientation="vertical" className="h-4 mx-2" />

            {/* Breadcrumb-style Navigation */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-800">Admin</span>
              {/* <span className="text-xs text-slate-300">/</span>
              <span className="text-sm font-semibold text-slate-900 tracking-tight">
                Dashboard
              </span> */}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle replaced the Pulsing Circle */}
            <ThemeToggle />

            {/* User Profile placeholder or Avatar */}
            <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs shadow-sm">
              AD
            </div>
          </div>
        </div>
      </header>
    );
  }
