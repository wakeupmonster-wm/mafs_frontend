import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header
      className="
        sticky top-0.5 z-40
        flex h-[var(--header-height)]
        items-center
        border-b bg-background
        transition-[width,height]
        ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]
      "
    >
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6 py-2">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">Documents</h1>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
