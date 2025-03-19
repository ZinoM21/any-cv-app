"use client";

import { Button } from "@/components/ui/button";
import { ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from "lucide-react";
import { useProfileStore } from "@/hooks/use-profile";
import { getTemplateById } from "@/config/templates";

import { PDF } from "./preview/pdf";
import { PDFLoadingSkeleton } from "./preview/pdf-loading";
import {
  RenderZoomInProps,
  RenderZoomOutProps,
  RenderZoomProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";

export function CVEditorPreview({ templateId }: { templateId: string }) {
  const profileData = useProfileStore((state) => state.profile);

  const template = getTemplateById(templateId);

  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn, ZoomOut, Zoom } = zoomPluginInstance;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="z-10 flex items-center justify-between border-b bg-white p-4">
        <h2 className="text-lg font-medium text-slate-900">
          Preview for{" "}
          {profileData?.firstName ? `${profileData.firstName}'s` : ""}{" "}
          {template?.name} CV{" "}
        </h2>
        <div className="flex items-center gap-2">
          <ZoomIn>
            {(props: RenderZoomInProps) => (
              <Button variant="outline" size="icon" onClick={props.onClick}>
                <ZoomInIcon className="size-4" />
              </Button>
            )}
          </ZoomIn>
          <Zoom>
            {(props: RenderZoomProps) => (
              <span className="text-sm text-slate-600">
                {Math.round(props.scale * 100)}%
              </span>
            )}
          </Zoom>

          <ZoomOut>
            {(props: RenderZoomOutProps) => (
              <Button variant="outline" size="icon" onClick={props.onClick}>
                <ZoomOutIcon className="size-4" />
              </Button>
            )}
          </ZoomOut>
        </div>
      </div>
      <div className="flex overflow-y-auto min-h-screen justify-center bg-white">
        {profileData ? (
          <PDF data={profileData} plugins={[zoomPluginInstance]} />
        ) : (
          <PDFLoadingSkeleton />
        )}
      </div>
    </div>
  );
}
