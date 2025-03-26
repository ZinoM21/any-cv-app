"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { marketingNav } from "@/config/nav";
import { useAuth } from "@/hooks/use-auth";
import useSession from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { LogOut, Menu, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInDialog from "./sign-in-dialog";

export function HeaderDropdownMenu({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { isSignedIn, data: session } = useSession();
  const { signUp } = useAuth();
  const pathname = usePathname();

  const marketingRoutes = marketingNav.map((item) => item.href).concat("/");
  const isMarketingRoute = marketingRoutes.includes(pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full",
            isSignedIn ? "lg:flex" : "lg:hidden",
            className
          )}
          {...props}
        >
          <UserRound className="hidden lg:block" />
          <Menu className="lg:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {isSignedIn && (
          <>
            <DropdownMenuLabel className="flex gap-2">
              <span className="whitespace-nowrap">My Account</span>
              <span className="text-sm text-muted-foreground min-w-0 truncate">
                {session?.user?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {pathname !== "/dashboard" && (
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Link href="/account-settings" className="w-full">
                  Account Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {isMarketingRoute && (
          <>
            <DropdownMenuGroup className="block lg:hidden">
              {marketingNav.map((item) => (
                <DropdownMenuItem key={item.name}>
                  <Link href={item.href} className="w-full">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="block lg:hidden" />
          </>
        )}

        {pathname !== "/" && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/" className="w-full">
                  Home Page
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        {isSignedIn ? (
          <DropdownMenuItem
            onClick={() => signOut()}
            className="justify-between hover:cursor-pointer"
          >
            Log out
            <LogOut />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuGroup className="space-y-1 mt-1">
            <Button
              onClick={() => signUp()}
              className="w-full text-sm"
              size="sm"
            >
              Sign Up
            </Button>
            <SignInDialog
              trigger={
                <Button className="w-full text-sm" size="sm" variant="outline">
                  Sign In
                </Button>
              }
            />
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
