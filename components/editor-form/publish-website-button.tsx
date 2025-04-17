"use client";

import SignInDialog from "@/components/auth/sign-in-dialog";
import { Button } from "@/components/ui/button";
import { useProfileUpdateMutation } from "@/hooks/use-profile-update-mutation";
import useSession from "@/hooks/use-session";
import { ApiErrorType } from "@/lib/errors";
import { getTemplateIdFromParamsOrRedirect } from "@/lib/utils";
import { Loader2, Ship } from "lucide-react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import PublishWebsiteDialog from "./publish-website-dialog";

const PublishButton = ({
  onClick,
  loading
}: {
  onClick?: () => void;
  loading?: boolean;
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      {loading ? (
        <Loader2 className="mr-1 animate-spin" />
      ) : (
        <Ship className="mr-1" />
      )}
      {loading ? "Publishing..." : "Publish"}
    </Button>
  );
};

export default function PublishWebsiteButton({
  onSuccess
}: {
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const { isSignedIn } = useSession();

  const searchParams = useSearchParams();

  const templateId = getTemplateIdFromParamsOrRedirect(
    searchParams.get("templateId")
  );

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const { mutateAsync, isPending: isPublishing } = useProfileUpdateMutation();

  const publish = async () => {
    await mutateAsync(
      {
        publishingOptions: {
          darkMode: isDarkMode,
          templateId: templateId
        }
      },
      {
        onSuccess,
        onError: (error) => {
          if (error.message === ApiErrorType.ResourceNotFound) {
            toast.error("Couldn't find this profile. Please try again.");
            return;
          }
          toast.error(`Failed to publish website. ${error.message}`);
        }
      }
    );
  };

  return (
    <>
      {isSignedIn ? (
        <PublishButton onClick={() => setOpen(true)} loading={isPublishing} />
      ) : (
        <SignInDialog
          trigger={<PublishButton loading={isPublishing} />}
          onSuccess={async () => setOpen(true)}
          customTitle="Log in to publish your site"
          customDescription="Please enter your credentials to publish your site."
        />
      )}
      <PublishWebsiteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={async () => {
          setOpen(false);
          await publish();
        }}
      />
    </>
  );
}
