import Link from "next/link";
import { Button } from "@/components/ui/button";

import { mainNav } from "@/config/nav";
import MobileHamburgerMenu from "./mobile-hamburger-menu";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur-[4px] border-b">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between p-6"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 font-semibold text-xl">
              built<span className="text-primary">any</span>cv
            </Link>
          </div>
          <div className="flex lg:hidden">
            <MobileHamburgerMenu navigation={mainNav} />
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            <div className="flex gap-x-8">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium leading-6 text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Button variant="outline" asChild>
              <Link href="/signin">Sign in</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
