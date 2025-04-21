import Link from "next/link";

import AuthOrDashboardButton from "@/components/auth/auth-dashboard-button";
import { HeaderDropdownMenu } from "@/components/auth/profile-button";
import { GenericHeader } from "@/components/generic-header";
import BuiltAnyCVLogo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { marketingNav } from "@/config/nav";

export function Header() {
  return (
    <GenericHeader>
      <div className="mx-auto  flex-1 px-4 sm:px-6 lg:px-8">
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
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </GenericHeader>
  );
}
