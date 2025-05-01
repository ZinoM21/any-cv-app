import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getServerApi, verifyEmail } from "@/lib/api";
import type { PromiseSearchParams } from "@/lib/types";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;
  const { token } = params;

  if (!token || typeof token !== "string") {
    redirect("/signin");
  }

  let message = "Verifying your email address";
  try {
    const api = await getServerApi();
    const verifyAnswer = await verifyEmail(api, token);
    message = verifyAnswer.message;
  } catch (error) {
    console.error(error);
    redirect("/signin");
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>Verifying your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="text-center">{message}</p>
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
