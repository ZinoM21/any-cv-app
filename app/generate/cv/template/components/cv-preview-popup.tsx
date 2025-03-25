"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import { PDFLoadingSkeleton } from "../../editor/components/preview/pdf-loading";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";

export default function CVPreviewPopup({
  cvTemplate,
  templateName,
}: {
  cvTemplate: string;
  templateName: string;
}) {
  const pdfUrl = `/cvs/pdfs/${cvTemplate}.pdf`;

  return (
    <Dialog key={cvTemplate}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="bg-white/90 backdrop-blur-sm">
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

        <div className="flex-1 overflow-auto bg-slate-100 p-4">
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
            />
          </Worker>
        </div>
      </DialogContent>
    </Dialog>
  );
}
