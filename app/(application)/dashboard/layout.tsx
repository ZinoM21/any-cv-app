import { HEADER_CHILDREN_CLASS } from "@/styles/shared";
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
      <DashboardSidebar className={HEADER_CHILDREN_CLASS}>
        {children}
      </DashboardSidebar>
    </>
  );
}
