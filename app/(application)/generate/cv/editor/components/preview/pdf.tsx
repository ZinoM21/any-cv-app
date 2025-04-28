"use client";

import { useEffect, useState } from "react";

import { Plugin, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import { getPDFTemplateById } from "@/components/templates/cv/cv-template-gate";
import {
  CVTemplate,
  ProfileData,
  TemplateId,
  type ImageUrl
} from "@/lib/types";
import { pdf } from "@react-pdf/renderer";
import { PDFLoadingSkeleton } from "./pdf-loading";

export const PDF = ({
  data,
  template,
  plugins,
  imageUrls
}: {
  data: Partial<ProfileData>;
  template: CVTemplate;
  plugins?: Plugin[];
  imageUrls?: Map<string, ImageUrl>;
}) => {
  const [url, setUrl] = useState<string>();

  const generateUrl = async (
    data: Partial<ProfileData>,
    templateId: TemplateId,
    imageUrls?: Map<string, ImageUrl>
  ) => {
    const PDFComponent = await getPDFTemplateById(templateId, data, imageUrls);
    const PDFBlob = await pdf(PDFComponent).toBlob();
    const pdfUrl = URL.createObjectURL(PDFBlob);
    setUrl(pdfUrl);
  };

  useEffect(() => {
    generateUrl(data, template.id, imageUrls);
  }, [data, template.id, imageUrls]);

  if (!url || url === "") {
    return (
      <div className="pt-5">
        <PDFLoadingSkeleton />
      </div>
    );
  }

  return (
    <Worker
      workerUrl={"https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js"}
    >
      <Viewer
        fileUrl={url}
        plugins={plugins}
        renderLoader={() => (
          <div className="flex h-full w-full justify-center bg-muted pt-5">
            <PDFLoadingSkeleton />
          </div>
        )}
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
  );
};
