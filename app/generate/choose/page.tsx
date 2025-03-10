import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, Globe } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileData, PromiseSearchParams } from "@/lib/types";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function GeneratingPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;
  const { username } = params;

  if (!username) {
    redirect("/");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${username}`
  );

  if (!response.ok) {
    redirect("/");
  }

  const profileData: ProfileData = await response.json();

  return (
    <div className="h-screen max-w-[1400px] mx-auto px-4 py-12">
      <Button
        variant="link"
        size="lg"
        className="group text-muted-foreground absolute"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
      </Button>
      <div className="flex h-full flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Hey {profileData.firstName}, what do you want start with?
            </CardTitle>
            <CardDescription>
              We found profile data for LinkedIn user /{username}. You can
              review this after you chose what to start with.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/generate/cv/template?username=${username}`}
              className="group flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow"
            >
              <div className="mb-3 rounded-full bg-blue-100 p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-1 font-medium text-slate-900">CV</h3>
              <p className="mb-3 text-sm text-slate-500">
                Create a professional resume
              </p>
              <span className="inline-flex items-center text-sm font-medium text-blue-600">
                Get started{" "}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href={`/generate/website/template?username=${username}`}
              className="group flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow"
            >
              <div className="mb-3 rounded-full bg-purple-100 p-3">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-1 font-medium text-slate-900">Website</h3>
              <p className="mb-3 text-sm text-slate-500">
                Build your personal website
              </p>
              <span className="inline-flex items-center text-sm font-medium text-purple-600">
                Get started{" "}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            You can do the other one later.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
