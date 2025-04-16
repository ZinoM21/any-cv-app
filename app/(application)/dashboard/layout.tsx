import { SidebarProvider } from "@/components/ui/sidebar";
import { HEADER_CHILDREN_CLASS } from "@/styles/shared";
import { ApplicationHeader } from "../components/application-header";
import DashboardSidebar from "./dashboard-sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ApplicationHeader showBreadcrumb={false} />
      <SidebarProvider
        className={HEADER_CHILDREN_CLASS}
        style={
          {
            "--sidebar-width": "16rem",
          } as React.CSSProperties
        }
      >
        <DashboardSidebar />
        <div className="size-full p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarProvider>
    </>
  );
}
