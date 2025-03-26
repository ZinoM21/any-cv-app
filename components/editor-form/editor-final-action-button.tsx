"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import DownloadCVButton from "@/app/generate/cv/editor/components/download-cv-button";
import SuggestNextActionDialog from "@/components/editor-form/suggest-next-action-dialog";
import PublishWebsiteButton from "@/app/generate/website/editor/components/publish-website-button";

export default function EditorFinalActionButton() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const isWebsite = pathname.includes("/website");
  const isCV = pathname.includes("/cv");

  const nextAction = isCV ? "website" : "cv";

  return (
    <>
      {isCV && <DownloadCVButton onSuccess={() => setOpen(true)} />}
      {isWebsite && <PublishWebsiteButton onSuccess={() => setOpen(true)} />}
      <SuggestNextActionDialog
        nextAction={nextAction}
        isOpen={open}
        setOpen={setOpen}
      />
    </>
  );
}
