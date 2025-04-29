"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import DownloadCVButton from "@/components/editor-form/download-cv-button";
import PublishWebsiteButton from "@/components/editor-form/publish-website-button";
import SuggestNextActionDialog from "@/components/editor-form/suggest-next-action-dialog";
import { toast } from "sonner";

export default function EditorFinalActionButton() {
  const [open, setOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState<string | undefined>();

  const pathname = usePathname();
  const isWebsite = pathname.includes("/website");
  const isCV = pathname.includes("/cv");

  const nextAction = isCV ? "website" : "cv";

  const onPublishSuccess = (slug?: string) => {
    setOpen(true);

    const url = `${window.location.origin}/${slug}`;
    setWebsiteUrl(url);
    toast.success(`Your website is now live at ${url}`);
  };

  return (
    <>
      {isCV && <DownloadCVButton onSuccess={() => setOpen(true)} />}
      {isWebsite && <PublishWebsiteButton onSuccess={onPublishSuccess} />}
      <SuggestNextActionDialog
        nextAction={nextAction}
        isOpen={open}
        setOpen={setOpen}
        websiteUrl={websiteUrl}
      />
    </>
  );
}
