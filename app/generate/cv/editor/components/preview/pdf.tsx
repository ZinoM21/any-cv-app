"use client";

import { useEffect, useState } from "react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { Plugin, Viewer, Worker } from "@react-pdf-viewer/core";

import { pdf } from "@react-pdf/renderer";
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
  const [url, setUrl] = useState<string>();
  const getDocument = (data: Partial<ProfileData>) => (
    <ResumeDocument data={data} />
  );

  const getBlob = async (data: Partial<ProfileData>) => {
    const DocComponent = getDocument(data);
    const blob = await pdf(DocComponent).toBlob();
    return blob;
  };

  const generateUrl = async (data: Partial<ProfileData>) => {
    const blob = await getBlob(data);
    const url = URL.createObjectURL(blob);
    setUrl(url);
  };

  useEffect(() => {
    generateUrl(data);
  }, [data]);

  if (!url || url === "") {
    return <PDFLoadingSkeleton />;
  }

  return (
    <Worker
      workerUrl={"https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js"}
    >
      <Viewer
        fileUrl={url}
        plugins={plugins}
        renderLoader={() => <PDFLoadingSkeleton />}
        theme="light"
        defaultScale={1}
      />
    </Worker>
  );
};
