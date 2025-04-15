"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import useSession from "@/hooks/use-session";

import { Button, ButtonProps } from "../ui/button";
import SignInDialog from "./sign-in-dialog";

export default function AuthOrDashboardButton({ className }: ButtonProps) {
  const { signUp } = useAuth();
  const { isSignedIn } = useSession();

  return (
    <>
      {isSignedIn ? (
        <Button variant="outline" asChild className={className}>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <div className="inline-flex gap-2">
          <SignInDialog
            trigger={
              <Button variant="outline" className={className}>
                Sign In
              </Button>
            }
          />
          <Button onClick={() => signUp()} className={className}>
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
}
