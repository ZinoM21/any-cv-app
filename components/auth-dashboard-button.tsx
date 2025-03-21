"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

import useSession from "@/hooks/use-session";
import { useAuth } from "@/hooks/use-auth";

import { Button, ButtonProps } from "./ui/button";

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
          <Button
            variant="outline"
            onClick={() => signIn()}
            className={className}
          >
            Sign In
          </Button>
          <Button onClick={() => signUp()} className={className}>
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
}
