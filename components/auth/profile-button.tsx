"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { dashboardNav } from "@/config/nav";
import { useAuth } from "@/hooks/use-auth";
import useSession from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { FileUser, LogOut, Menu, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInDialog from "./sign-in-dialog";

export function HeaderDropdownMenu({
  className,
  isMarketing = false,
  ...props
}: React.ComponentProps<"button"> & { isMarketing?: boolean }) {
  const { isSignedIn, data: session } = useSession();
  const { signUp } = useAuth();
  const pathname = usePathname();

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
              <span className="min-w-0 truncate text-sm text-muted-foreground">
                {session?.user?.name}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* DASHBOARD (dashboard, account) */}
            <DropdownMenuGroup>
              {dashboardNav.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  className={item.href !== "/dashboard/account" ? "lg:hidden" : ""}
                  asChild
                >
                  <Link
                    href={item.href}
                    className="cursor-pointer justify-between"
                  >
                    {item.name}
                    {item.icon && <item.icon className="size-4" />}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        {/* MARKETING (templates, pricing, guides, ...) */}
        {isMarketing && (
          <>
            {/* <DropdownMenuGroup className="block lg:hidden">
              {marketingNav.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link
                    href={item.href}
                    className="cursor-pointer justify-between"
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="block lg:hidden" /> */}
          </>
        )}

        {/* HOME */}
        {pathname !== "/" && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/" className="cursor-pointer justify-between">
                  Home Page
                  <FileUser className="size-4" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {/* AUTH */}
        {isSignedIn ? (
          <DropdownMenuItem
            onClick={() => signOut({ redirectTo: "/" })}
            className="cursor-pointer justify-between"
          >
            Log out
            <LogOut />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuGroup className="mt-1 space-y-1">
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
