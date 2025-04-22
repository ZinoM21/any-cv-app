import AuthOrDashboardButton from "@/components/auth/auth-dashboard-button";
import { HeaderDropdownMenu } from "@/components/auth/profile-button";
import BuildAnyCVLogo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { marketingNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header({
  breadcrumb,
  isMarketing = false
}: {
  breadcrumb?: React.ReactNode;
  isMarketing?: boolean;
}) {
  return (
    <header className="border-grid fixed inset-x-0 top-0 z-50 flex h-14 items-center border-b bg-background/85 backdrop-blur-[4px] sm:h-16">
      <div
        className={cn(
          isMarketing && "max-w-[1400px]",
          "mx-auto flex flex-1 items-center justify-between gap-4 px-3 sm:px-6 lg:px-8"
        )}
      >
        <BuildAnyCVLogo />

        {breadcrumb}

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-8">
          {isMarketing ? (
            <>
              {marketingNav.map((item) => (
                <Link key={item.name} href={item.href}>
                  {item.name}
                </Link>
              ))}
            </>
          ) : (
            <Link href="https://builtanycv.userjot.com/">Feedback</Link>
          )}
          <AuthOrDashboardButton />
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 lg:flex-initial">
          <HeaderDropdownMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
