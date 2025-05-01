import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { PromiseSearchParams } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reset Password - BuildAnyCV",
  description: "Create a new password for your BuildAnyCV account."
};

export default async function ResetPasswordPage({
  searchParams
}: {
  searchParams: PromiseSearchParams;
}) {
  const { token } = await searchParams;

  // Redirect to signin if no token is provided
  if (!token || typeof token !== "string") {
    redirect("/signin");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Please enter a new password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/signin">Back to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
