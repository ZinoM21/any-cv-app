import { GenericHeader } from "@/components/generic-header";
import AuthOrDashboardButton from "@/components/auth-dashboard-button";
import useSession from "@/hooks/use-session";
import { HeaderDropdownMenu } from "@/components/profile-button";
import BreadCrumb from "./breadcrumb";

export function BreadcrumpHeader() {
  // const { isSignedIn } = useSession();

  return (
    <GenericHeader>
      <div className="flex items-center justify-between gap-4 flex-1 mx-auto px-4 sm:px-6 lg:px-8">
        <BreadCrumb className="flex-1" />

        <div className="hidden lg:flex lg:items-center">
          <AuthOrDashboardButton />
        </div>
        <HeaderDropdownMenu />
      </div>
    </GenericHeader>
  );
}
