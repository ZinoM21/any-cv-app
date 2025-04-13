"use client";

import SignInDialog from "@/components/auth/sign-in-dialog";
import { Button } from "@/components/ui/button";
import useSession from "@/hooks/use-session";
import { Loader2, Ship } from "lucide-react";
import { toast } from "sonner";
import { useProfileUpdateMutation } from "@/hooks/use-profile-update-mutation";
import { getTemplateIdFromParamsOrRedirect } from "@/lib/utils";
import { getUsernameFromParamsOrRedirect } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const PublishButton = ({
  onClick,
  loading,
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
  onSuccess,
}: {
  onSuccess?: (websiteUrl: string) => void;
}) {
  const { isSignedIn } = useSession();

  const searchParams = useSearchParams();
  const username = getUsernameFromParamsOrRedirect(
    searchParams.get("username")
  );
  const templateId = getTemplateIdFromParamsOrRedirect(
    searchParams.get("templateId")
  );

  const publishingOptions = {
    darkMode: true,
    templateId: templateId,
  };

  const { mutateAsync, isPending: isPublishing } = useProfileUpdateMutation();

  const publish = async () => {
    await mutateAsync(
      {
        publishingOptions,
      },
      {
        onSuccess: () => {
          const websiteUrl = `${window.location.origin}/${username}`;
          toast.success(`Your website is now live at ${websiteUrl}`);
          onSuccess?.(websiteUrl);
        },
        onError: (error) => {
          console.error("Error publishing website:", error);
          toast.error("Failed to publish website. Please try again.");
        },
      }
    );
  };

  if (isSignedIn) {
    return <PublishButton onClick={publish} loading={isPublishing} />;
  }

  return (
    <SignInDialog
      trigger={<PublishButton loading={isPublishing} />}
      onSuccess={publish}
      customTitle="Log in to publish your site"
      customDescription="Please enter your credentials to publish your site."
    />
  );
}
