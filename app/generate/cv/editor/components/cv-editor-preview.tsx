"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useProfileStore } from "@/hooks/use-profile";
import { getTemplateById } from "@/config/templates";
// import ResumePDFViewer from "./preview/resume-three";

import { pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PDF } from "./preview/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function CVEditorPreview({ templateId }: { templateId: string }) {
  const profileData = useProfileStore((state) => state.profile);

  const template = getTemplateById(templateId);

  const [zoomLevel, setZoomLevel] = useState(100);

  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 1; // Would be calculated based on content in a real app

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50));
  };

  // const handlePrevPage = () => {
  //   setCurrentPage((prev) => Math.max(prev - 1, 1));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // };

  return (
    <div className="flex h-full flex-col">
      {/* Preview toolbar */}
      <div className="z-10 flex items-center justify-between border-b bg-white p-4">
        <h2 className="text-lg font-medium text-slate-900">
          Preview for{" "}
          {profileData?.firstName ? `${profileData.firstName}'s` : ""}{" "}
          {template?.name} CV{" "}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
          >
            <ZoomOut className="size-4" />
          </Button>
          <span className="text-sm text-slate-600">{zoomLevel}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 200}
          >
            <ZoomIn className="size-4" />
          </Button>
        </div>
      </div>
      <div className="flex overflow-y-auto justify-center p-8">
        {profileData ? <PDF data={profileData} /> : "LOADING..."}
      </div>
    </div>
  );
}
