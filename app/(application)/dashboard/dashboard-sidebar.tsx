import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar";
import { sidebarNav } from "@/config/nav";
import Link from "next/link";
import type { ReactNode } from "react";

const SIDEBAR_WIDTH = "16rem";
const MOBILE_SIDEBAR_WIDTH = "20rem";

export default function DashboardSidebar({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <SidebarProvider
      className={className}
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH
        } as React.CSSProperties
      }
    >
      <Sidebar
        widthMobile={MOBILE_SIDEBAR_WIDTH}
        className="mt-14 h-[calc(100vh-56px)] min-h-0 sm:mt-16 sm:h-[calc(100vh-64px)]"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarNav.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        {item.icon && <item.icon />}
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="size-full overflow-y-auto p-4 sm:p-6">{children}</div>
    </SidebarProvider>
  );
}
