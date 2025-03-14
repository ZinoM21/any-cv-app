"use client";

import { useEffect } from "react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { Plugin, Viewer, Worker } from "@react-pdf-viewer/core";

import { usePDF } from "@react-pdf/renderer";
import { ResumeDocument } from "./resume-two";
import { ProfileData } from "@/lib/types";
import { PDFLoadingSkeleton } from "./pdf-loading";

export const PDF = ({
  data,
  plugins,
}: {
  data: Partial<ProfileData>;
  plugins?: Plugin[];
}) => {
  const getDocument = (data: Partial<ProfileData>) => (
    <ResumeDocument data={data} />
  );

  const [instance, update] = usePDF({
    document: getDocument(data),
  });

  useEffect(() => {
    update?.(getDocument(data));
  }, [data, update]);

  if (!instance || instance.loading || !instance.url) {
    return <PDFLoadingSkeleton />;
  }

  return (
    <Worker
      workerUrl={"https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js"}
    >
      <Viewer
        fileUrl={instance.url}
        plugins={plugins}
        renderLoader={() => <PDFLoadingSkeleton />}
        theme="light"
        defaultScale={1}
      />
    </Worker>
  );
};
