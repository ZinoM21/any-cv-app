import Link from "next/link";
import { ArrowRight, FileText, Globe } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileData } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function GeneratingPage({
  searchParams,
}: {
  searchParams: { username: string };
}) {
  const { username } = await searchParams;

  if (!username) {
    redirect("/");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${username}`
  );

  const profileData: ProfileData = await response.json();

  return (
    <div className="mt-[-73px] flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/20 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">
            Hey {profileData.firstName}, what do you want start with?
          </CardTitle>
          <CardDescription>
            We found profile data for LinkedIn user /{username}. You can review
            this after you chose what to start with.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/generate/cv?username=${username}`}
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
              href={`/generate/website?username=${username}`}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
