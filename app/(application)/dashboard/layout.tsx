import { Header } from "../../../components/header";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <DashboardSidebar className="mt-14 h-[calc(100vh-56px)] min-h-0 sm:mt-16 sm:h-[calc(100vh-64px)]">
        {children}
      </DashboardSidebar>
    </>
  );
}
