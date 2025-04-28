"use client";

import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/hooks/use-profile";
import { ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from "lucide-react";

import {
  RenderZoomInProps,
  RenderZoomOutProps,
  RenderZoomProps
} from "@react-pdf-viewer/zoom";
import { PDF } from "./preview/pdf";
import { PDFLoadingSkeleton } from "./preview/pdf-loading";

import { useSignedUrlsMap } from "@/hooks/use-image-url";
import { usePdfPlugins } from "@/hooks/use-pdf-plugins";
import { CVTemplate } from "@/lib/types";
import { useEffect } from "react";

export function CVEditorPreview({ template }: { template: CVTemplate }) {
  const profileData = useProfileStore((state) => state.profile);

  const { ZoomIn, ZoomOut, Zoom } = usePdfPlugins();

  const {
    isLoading: isLoadingImages,
    data: imageUrls,
    refetch: refetchImages
  } = useSignedUrlsMap(profileData);

  useEffect(() => {
    // Explicitly refetch here to update the PDF when the profile state changes
    refetchImages?.();
  }, [profileData, refetchImages]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-grid z-10 flex items-center justify-between border-b border-l bg-background p-3 sm:p-4">
        <h2 className="font-medium">
          Preview for{" "}
          {profileData?.firstName ? `${profileData.firstName}'s` : ""}{" "}
          {template?.name} CV{" "}
        </h2>
        <div className="flex items-center gap-2">
          <ZoomIn>
            {(props: RenderZoomInProps) => (
              <Button variant="ghost" size="icon" onClick={props.onClick}>
                <ZoomInIcon className="size-4" />
              </Button>
            )}
          </ZoomIn>
          <Zoom>
            {(props: RenderZoomProps) => (
              <span className="text-sm text-muted-foreground">
                {Math.round(props.scale * 100)}%
              </span>
            )}
          </Zoom>

          <ZoomOut>
            {(props: RenderZoomOutProps) => (
              <Button variant="ghost" size="icon" onClick={props.onClick}>
                <ZoomOutIcon className="size-4" />
              </Button>
            )}
          </ZoomOut>
        </div>
      </div>
      <div className="flex flex-1 justify-center overflow-y-auto bg-muted">
        {!profileData || isLoadingImages ? (
          <div className="pt-5">
            <PDFLoadingSkeleton />
          </div>
        ) : (
          <PDF data={profileData} template={template} imageUrls={imageUrls} />
        )}
      </div>
    </div>
  );
}
