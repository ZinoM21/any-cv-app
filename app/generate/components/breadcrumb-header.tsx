import { GenericHeader } from "@/components/generic-header";
import AuthOrDashboardButton from "@/components/auth/auth-dashboard-button";
import { HeaderDropdownMenu } from "@/components/auth/profile-button";
import BreadCrumb from "./breadcrumb";
import ThemeToggle from "@/components/theme-toggle";

export function BreadcrumpHeader() {
  return (
    <GenericHeader>
      <div className="flex items-center justify-between gap-4 flex-1 mx-auto px-3 sm:px-6 lg:px-8">
        <BreadCrumb className="flex-1" />

        <div className="hidden lg:flex gap-2 lg:items-center">
          <AuthOrDashboardButton />
          <ThemeToggle />
        </div>
        <HeaderDropdownMenu />
      </div>
    </GenericHeader>
  );
}
