"use client";

import { Button } from "@/components/ui/button";
import { ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from "lucide-react";
import { useProfileStore } from "@/hooks/use-profile";

import { PDF } from "./preview/pdf";
import { PDFLoadingSkeleton } from "./preview/pdf-loading";
import {
  RenderZoomInProps,
  RenderZoomOutProps,
  RenderZoomProps,
} from "@react-pdf-viewer/zoom";

import { CVTemplate } from "@/lib/types";
import { usePdfPlugins } from "@/hooks/use-pdf-plugins";

export function CVEditorPreview({ template }: { template: CVTemplate }) {
  const profileData = useProfileStore((state) => state.profile);

  const { filePluginInstance, zoomPluginInstance, ZoomIn, ZoomOut, Zoom } =
    usePdfPlugins();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="z-10 flex items-center justify-between border-b border-l border-grid bg-background p-3 sm:p-4">
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
      <div className="flex overflow-y-auto flex-1 justify-center bg-muted">
        {profileData ? (
          <PDF
            data={profileData}
            plugins={[zoomPluginInstance, filePluginInstance]}
            template={template}
          />
        ) : (
          <div className="pt-5">
            <PDFLoadingSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
