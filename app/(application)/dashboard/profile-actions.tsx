"use client";

import PublishWebsiteDialog from "@/components/editor-form/publish-website-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useUnpublishProfile } from "@/hooks/use-unpublish-profile";
import type { ProfileData } from "@/lib/types";
import {
  ExternalLink,
  EyeOff,
  MoreHorizontal,
  Ship,
  Trash
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import DeleteProfileDialog from "./delete-profile-dialog";

const ProfileActions = ({ profile }: { profile: ProfileData }) => {
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { mutateAsync: unpublishAsync } = useUnpublishProfile(profile.username);
  const router = useRouter();

  const unpublishProfile = async () => {
    await unpublishAsync(undefined, {
      onSuccess: async () => {
        toast.success("Profile unpublished");
        router.refresh(); // revalidate page -> must be done like this since NextJS's revalidatePath is not client-compatible
      }
    });
  };

  const onPublishSuccess = (slug?: string) => {
    setIsPublishOpen(false);
    toast.success(
      `Your website is now live at ${window.location.origin}/${slug}`
    );
    router.refresh(); // revalidate page -> must be done like this since NextJS's revalidatePath is not client-compatible
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profile.publishingOptions?.slug ? (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href={`/${profile.publishingOptions.slug}`}
                  target="_blank"
                  className="cursor-pointer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Website
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  unpublishProfile();
                }}
                className="cursor-pointer"
              >
                <EyeOff className="mr-2 h-4 w-4" />
                Unpublish
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => {
                  setIsPublishOpen(true);
                }}
                className="cursor-pointer"
              >
                <Ship className="mr-2 h-4 w-4" />
                Publish
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteOpen(true);
            }}
            className="cursor-pointer text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* We have to mount the dialogs here outside the dropdown menu. Otherwise, the dialogs would not be unmounted on dropdown close.
      Therefore, we are also controlling the open states manually instead of using the trigger component.
      */}
      <PublishWebsiteDialog
        username={profile.username}
        open={isPublishOpen}
        setOpen={setIsPublishOpen}
        onSuccess={onPublishSuccess}
      />
      <DeleteProfileDialog
        username={profile.username}
        open={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </>
  );
};

export default ProfileActions;
