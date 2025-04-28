"use client";

import { Button } from "@/components/ui/button";
import useSession from "@/hooks/use-session";
import { Loader2, Ship } from "lucide-react";
import { useState } from "react";
import SignUpDialog from "../auth/sign-up-dialog";
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
        <SignUpDialog
          trigger={<PublishButton loading={false} />}
          onSuccess={async () => setOpen(true)}
          customTitle="Create account to publish your site"
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
