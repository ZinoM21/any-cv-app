import { ArrowRight, FileText, Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getProfileDataOrRedirect } from "@/lib/api";
import { PromiseSearchParams } from "@/lib/types";
import { buildQueryString, getUsernameFromParamsOrRedirect } from "@/lib/utils";
import { SetProfileData } from "./set-profile-data";

export default async function GeneratingPage({
  searchParams
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;
  const username = getUsernameFromParamsOrRedirect(params.username);
  const profileData = await getProfileDataOrRedirect(username);

  return (
    <div className="mx-auto h-full max-w-[1400px] px-4 py-12">
      <div className="flex h-full flex-col items-center justify-center">
        <Card className="mx-auto w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              Hey {profileData.firstName}, what do you want start with?
            </CardTitle>
            <CardDescription>
              We found profile data for LinkedIn user /{username}. You can
              review this after you chose what to start with.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              className="group flex h-fit flex-col items-center justify-center whitespace-normal p-6 text-center shadow-sm transition-all hover:shadow"
              asChild
            >
              <Link href={`/generate/cv/template?${buildQueryString(params)}`}>
                <div className="mb-3 rounded-full bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-1 font-medium">CV</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Create a professional resume
                </p>
                <span className="inline-flex items-center text-sm font-medium text-blue-600">
                  Get started{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="group flex h-fit flex-col items-center justify-center whitespace-normal p-6 text-center shadow-sm transition-all hover:shadow"
              asChild
            >
              <Link
                href={`/generate/website/template?${buildQueryString(params)}`}
              >
                <div className="mb-3 rounded-full bg-purple-100 p-3">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-1 font-medium">Website</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Build your personal website
                </p>
                <span className="inline-flex items-center text-sm font-medium text-purple-600">
                  Get started{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            You can do the other one later.
          </CardFooter>
          <SetProfileData profileData={profileData} />
        </Card>
      </div>
    </div>
  );
}
