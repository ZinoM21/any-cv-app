"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

import { PDFLoadingSkeleton } from "../../editor/components/preview/pdf-loading";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function CVPreviewPopup({
  templateId,
  templateName
}: {
  templateId: string;
  templateName: string;
}) {
  const pdfUrl = `/cvs/pdfs/${templateId}.pdf`;

  return (
    <Dialog key={templateId}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent
        className="flex h-[95vh] min-w-[900px] flex-col"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>{templateName} Template - Preview</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto rounded-lg bg-muted">
          <Worker
            workerUrl={
              "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js"
            }
          >
            <Viewer
              fileUrl={pdfUrl}
              renderLoader={() => <PDFLoadingSkeleton />}
              theme="light"
              defaultScale={1}
              pageLayout={{
                buildPageStyles: ({ pageIndex }) => {
                  return {
                    paddingTop: pageIndex === 0 ? 20 : 0,
                    backgroundColor: "hsl(var(--muted))"
                  };
                }
              }}
            />
          </Worker>
        </div>
      </DialogContent>
    </Dialog>
  );
}
