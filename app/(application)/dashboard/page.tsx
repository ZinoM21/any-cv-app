import { auth, signOut } from "@/auth";
import { Image } from "@/components/editor-form/form-sections/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { getServerApi, getUserProfiles } from "@/lib/api";
import type { PublishingOptions } from "@/lib/types";
import { buildQueryString, cn, getInitials } from "@/lib/utils";
import { Edit3, FileStack, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddProfileDialog from "./add-profile-dialog";
import ProfileActions from "./profile-actions";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (session?.error === "RefreshAccessTokenError") {
    signOut({ redirectTo: "/signin" });
  }

  const api = await getServerApi();
  const profiles = await getUserProfiles(api);

  const isPublished = (publishingOptions: PublishingOptions | undefined) => {
    return !!(publishingOptions?.slug && publishingOptions?.templateId);
  };

  const isEmpty = profiles.length === 0;

  return (
    <>
      <div className="mb-4 flex flex-row items-center justify-between sm:mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">My Profiles</h1>
        <AddProfileDialog
          trigger={
            <Button>
              <Plus />
              Create Profile
            </Button>
          }
        />
      </div>

      {isEmpty ? (
        <EmptyState
          className="mx-auto mt-20"
          title="No profiles"
          description="Create a profile to get started creating your CV and website"
          icons={[FileStack]}
          action={
            <AddProfileDialog
              trigger={
                <Button
                  variant="outline"
                  className={cn("mt-4", "shadow-sm active:shadow-none")}
                >
                  <Plus />
                  Create Profile
                </Button>
              }
            />
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {profiles.map((profile) => (
            <Card key={profile._id} className="h-full">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Image
                  className="flex-shrink-0 rounded-full"
                  src={profile.profilePictureUrl}
                  alt={`Profile picture of ${profile.firstName} ${profile.lastName}`}
                  fallback={
                    profile.firstName &&
                    profile.lastName &&
                    getInitials(profile.firstName, profile.lastName)
                  }
                />
                <div className="w-full min-w-0">
                  <div className="flex w-full flex-row items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="truncate text-lg">
                        {profile.firstName} {profile.lastName}
                      </CardTitle>
                    </div>
                    <Badge
                      className="flex-shrink-0"
                      variant={
                        isPublished(profile.publishingOptions)
                          ? "success"
                          : "secondary"
                      }
                    >
                      {isPublished(profile.publishingOptions)
                        ? "Live"
                        : "Unpublished"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-1">
                    {profile.headline || "No headline"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profile.about && (
                    <p className="line-clamp-3 min-h-[3.75rem] text-sm">
                      {profile.about}
                    </p>
                  )}
                  {profile.location && (
                    <p className="text-sm text-muted-foreground">
                      📍 {profile.location}
                    </p>
                  )}
                  {profile.skills && profile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                      {profile.skills.length > 3 && (
                        <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                          +{profile.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex w-full min-w-0 flex-row justify-between gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link
                    href={`/generate/cv/editor?${buildQueryString({
                      username: profile.username,
                      templateId: profile.publishingOptions?.templateId
                    })}`}
                  >
                    <Edit3 />
                    Edit CV
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link
                    href={`/generate/website/editor?${buildQueryString({
                      username: profile.username,
                      templateId: profile.publishingOptions?.templateId
                    })}`}
                  >
                    <Edit3 />
                    Edit Website
                  </Link>
                </Button>
                <ProfileActions profile={profile} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
