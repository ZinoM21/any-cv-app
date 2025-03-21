import Link from "next/link";

import { marketingNav } from "@/config/nav";
import { GenericHeader } from "@/components/generic-header";
import BuiltAnyCVLogo from "@/components/logo";
import AuthOrDashboardButton from "@/components/auth-dashboard-button";
import { HeaderDropdownMenu } from "@/components/profile-button";

export function Header() {
  return (
    <GenericHeader>
      <div className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <BuiltAnyCVLogo />
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden lg:flex lg:items-center lg:gap-x-8">
              {marketingNav.map((item) => (
                <Link key={item.name} href={item.href}>
                  {item.name}
                </Link>
              ))}
              <AuthOrDashboardButton />
            </div>
            <HeaderDropdownMenu />
          </div>
        </nav>
      </div>
    </GenericHeader>
  );
}
