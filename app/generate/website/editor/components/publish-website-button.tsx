"use client";

import SignInDialog from "@/components/auth/sign-in-dialog";
import { Button } from "@/components/ui/button";
import useSession from "@/hooks/use-session";
import { Ship } from "lucide-react";
import { toast } from "sonner";

const PublishButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <Ship className="mr-1" />
      Publish
    </Button>
  );
};

export default function PublishWebsiteButton({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { isSignedIn } = useSession();

  const onPublishSuccess = () => {
    toast.success("Done! Checkout your new website on https://demodomain.com");

    setTimeout(() => {
      onSuccess?.();
    }, 500);
  };
  const handlePublish = () => {
    console.log("Website published!");
  };

  if (isSignedIn) {
    return (
      <PublishButton
        onClick={() => {
          handlePublish();
          onPublishSuccess();
        }}
      />
    );
  }

  return (
    <SignInDialog
      trigger={<PublishButton />}
      onSuccess={() => {
        handlePublish();
        onPublishSuccess();
      }}
      customTitle="Log in to publish your site"
      customDescription="Please enter your credentials to publish your site."
    />
  );
}
