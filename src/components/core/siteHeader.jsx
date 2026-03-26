import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import dummyImg from "@/assets/web/dummyImg.webp";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";

export function SiteHeader() {
  const navigate = useNavigate();
  const { account } = useSelector((state) => state.account);

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b bg-white/60 backdrop-blur-md px-4 transition-all">
      <div className="flex w-full items-center justify-between md:justify-end">
        <div className="flex items-center gap-2 md:hidden">
          {/* Sidebar Trigger for Mobile & Desktop collapse */}
          <SidebarTrigger className="-ml-1 text-slate-500 hover:bg-slate-100" />
          <Separator orientation="vertical" className="h-4 mx-2" />
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => navigate("/admin/accounts")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-200 group"
                >
                  {/* Avatar with fallback logic */}
                  <Avatar className="h-9 w-9 rounded-full border shadow-lg transition-transform group-hover:scale-105 border-brand-aqua">
                    <AvatarImage
                      src={account?.avatar?.url || dummyImg}
                      alt={account?.nickname}
                    />
                    <AvatarFallback className="bg-indigo-100 text-brand-aqua font-bold text-xs">
                      {account?.nickname?.slice(0, 2).toUpperCase() || "AD"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>

              {/* Hover Card / Tooltip content */}
              <TooltipContent
                side="bottom"
                className="flex flex-col gap-1 p-3 bg-white border-slate-200 shadow-xl"
              >
                <p className="font-bold text-brand-aqua">{account?.nickname}</p>
                <p className="text-xs text-slate-500">{account?.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
