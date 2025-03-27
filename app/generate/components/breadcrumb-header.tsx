import { GenericHeader } from "@/components/generic-header";
import AuthOrDashboardButton from "@/components/auth/auth-dashboard-button";
import { HeaderDropdownMenu } from "@/components/auth/profile-button";
import BreadCrumb from "./breadcrumb";

export function BreadcrumpHeader() {
  return (
    <GenericHeader>
      <div className="flex items-center justify-between gap-4 flex-1 mx-auto px-3 sm:px-6 lg:px-8">
        <BreadCrumb className="flex-1" />

        <div className="hidden lg:flex lg:items-center">
          <AuthOrDashboardButton />
        </div>
        <HeaderDropdownMenu />
      </div>
    </GenericHeader>
  );
}
