"use client";
// import { useState } from "react";

// import { pdfjs, Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Viewer, Worker } from "@react-pdf-viewer/core";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

export default function CVPreviewPopup({
  cvTemplate,
  templateName,
}: {
  cvTemplate: string;
  templateName: string;
}) {
  // const [numPages, setNumPages] = useState<number>(1);

  // function onDocumentLoadSuccess({
  //   numPages: nextNumPages,
  // }: PDFDocumentProxy): void {
  //   setNumPages(nextNumPages);
  // }

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
              // plugins={plugins}
              // renderLoader={() => <PDFLoadingSkeleton />}
              theme="light"
              // defaultScale={1}
            />
          </Worker>
          {/* <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="space-y-4"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={820}
              />
            ))}
          </Document> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
