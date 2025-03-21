"use client";

import { signOut } from "next-auth/react";
import { Button, ButtonProps } from "./ui/button";

export default function SignOutButton({ className }: ButtonProps) {
  return (
    <Button variant="outline" className={className} onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
