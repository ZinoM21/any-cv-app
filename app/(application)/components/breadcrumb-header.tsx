import AuthOrDashboardButton from "@/components/auth/auth-dashboard-button";
import { HeaderDropdownMenu } from "@/components/auth/profile-button";
import { GenericHeader } from "@/components/generic-header";
import ThemeToggle from "@/components/theme-toggle";
import BreadCrumb from "./breadcrumb";

export function BreadcrumpHeader() {
  return (
    <GenericHeader>
      <div className="flex items-center justify-between gap-4 flex-1 mx-auto px-3 sm:px-6 lg:px-8">
        <BreadCrumb className="flex-1" />

        <div className="hidden lg:flex gap-2 lg:items-center">
          <AuthOrDashboardButton />
        </div>
        <HeaderDropdownMenu />
        <ThemeToggle />
      </div>
    </GenericHeader>
  );
}
