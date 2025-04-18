"use client";

import SignInDialog from "@/components/auth/sign-in-dialog";
import { Button } from "@/components/ui/button";
import useSession from "@/hooks/use-session";
import { Loader2, Ship } from "lucide-react";
import { useState } from "react";
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
  username,
  onSuccess
}: {
  username: string;
  onSuccess: (slug?: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const { isSignedIn } = useSession();

  return (
    <>
      {isSignedIn ? (
        <PublishButton onClick={() => setOpen(true)} loading={false} />
      ) : (
        <SignInDialog
          trigger={<PublishButton loading={false} />}
          onSuccess={async () => setOpen(true)}
          customTitle="Log in to publish your site"
          customDescription="Please enter your credentials to publish your site."
        />
      )}
      <PublishWebsiteDialog
        username={username}
        open={open}
        setOpen={setOpen}
        onSuccess={(slug) => {
          onSuccess(slug);
          setOpen(false);
        }}
      />
    </>
  );
}
