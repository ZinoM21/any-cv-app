"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

import DownloadCVButton from "@/app/generate/cv/editor/components/download-cv-button";
import PublishWebsiteButton from "@/app/generate/website/editor/components/publish-website-button";
import SuggestNextActionDialog from "@/components/editor-form/suggest-next-action-dialog";
import { getUsernameFromParamsOrRedirect } from "@/lib/utils";
import { toast } from "sonner";

export default function EditorFinalActionButton() {
  const [open, setOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState<string | undefined>();

  const pathname = usePathname();
  const isWebsite = pathname.includes("/website");
  const isCV = pathname.includes("/cv");

  const nextAction = isCV ? "website" : "cv";

  const searchParams = useSearchParams();
  const username = getUsernameFromParamsOrRedirect(
    searchParams.get("username")
  );

  return (
    <>
      {isCV && <DownloadCVButton onSuccess={() => setOpen(true)} />}
      {isWebsite && (
        <PublishWebsiteButton
          onSuccess={() => {
            setOpen(true);

            const url = `${window.location.origin}/${username}`;
            setWebsiteUrl(url);

            toast.success(`Your website is now live at ${url}`);
          }}
        />
      )}
      <SuggestNextActionDialog
        nextAction={nextAction}
        isOpen={open}
        setOpen={setOpen}
        websiteUrl={websiteUrl}
      />
    </>
  );
}
