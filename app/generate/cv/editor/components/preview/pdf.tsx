"use client";

import { useEffect, useState } from "react";

import { Plugin, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import { pdf } from "@react-pdf/renderer";
import { CVTemplate, ProfileData, TemplateId } from "@/lib/types";
import { PDFLoadingSkeleton } from "./pdf-loading";
import { getTemplatePDFById } from "@/components/templates/cv/cv-template-gate";

export const PDF = ({
  data,
  template,
  plugins,
}: {
  data: Partial<ProfileData>;
  template: CVTemplate;
  plugins?: Plugin[];
}) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const getBlob = async (
      data: Partial<ProfileData>,
      templateId: TemplateId
    ) => {
      const DocComponent = await getTemplatePDFById(templateId, data);
      const blob = await pdf(DocComponent).toBlob();
      return blob;
    };

    const generateUrl = async (
      data: Partial<ProfileData>,
      templateId: TemplateId
    ) => {
      const blob = await getBlob(data, templateId);
      const url = URL.createObjectURL(blob);
      setUrl(url);
    };

    generateUrl(data, template.id);
  }, [data, template.id]);

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
          <div className="pt-5 w-full h-full bg-muted flex justify-center">
            <PDFLoadingSkeleton />
          </div>
        )}
        theme="light"
        defaultScale={1}
        pageLayout={{
          buildPageStyles: ({ pageIndex }) => {
            return {
              paddingTop: pageIndex === 0 ? 20 : 0,
              backgroundColor: "hsl(var(--muted))",
            };
          },
        }}
      />
    </Worker>
  );
};
