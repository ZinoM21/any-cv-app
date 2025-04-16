import AuthOrDashboardButton from "@/components/auth/auth-dashboard-button";
import { HeaderDropdownMenu } from "@/components/auth/profile-button";
import { GenericHeader } from "@/components/generic-header";
import BuiltAnyCVLogo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import BreadCrumb from "./breadcrumb";

export function ApplicationHeader({
  showBreadcrumb = true,
}: {
  showBreadcrumb?: boolean;
}) {
  return (
    <GenericHeader>
      <div className="mx-auto flex flex-1 items-center justify-between gap-4 px-3 sm:px-6 lg:px-8">
        {showBreadcrumb ? (
          <BreadCrumb className="flex-1" />
        ) : (
          <BuiltAnyCVLogo className="flex-1" />
        )}

        <div className="hidden gap-2 lg:flex lg:items-center">
          <AuthOrDashboardButton />
        </div>
        <HeaderDropdownMenu />
        <ThemeToggle />
      </div>
    </GenericHeader>
  );
}
