"use client";

import { useEffect, useState } from "react";

import { useProfileStore } from "@/hooks/use-profile";
import { CVTemplate, ProfileData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TabbedEditorForm } from "@/components/editor-form/tabbed-editor-form";
import { CVEditorPreview } from "./cv-editor-preview";
import { PdfPluginsProvider } from "@/hooks/use-pdf-plugins";

export default function CVEditor({
  profileData,
  template,
}: {
  profileData: ProfileData;
  template: CVTemplate;
}) {
  const setProfileData = useProfileStore((state) => state.setProfile);
  const [activeView, setActiveView] = useState<"form" | "preview">("form");

  const getMobileViewClassName = (view: typeof activeView) => {
    return activeView !== view ? "hidden" : "flex";
  };

  useEffect(() => {
    // Set initial profile data
    setProfileData(profileData);
  }, [profileData, setProfileData]);

  return (
    <>
      <div className="flex lg:hidden w-full border-b bg-background">
        <button
          className={`flex-1 border-b-2 py-2 sm:py-4 text-center font-medium ${
            activeView === "form"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-muted-foreground"
          }`}
          onClick={() => setActiveView("form")}
        >
          Edit Information
        </button>
        <button
          className={`flex-1 border-b-2 py-2 sm:py-4 text-center font-medium ${
            activeView === "preview"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-muted-foreground"
          }`}
          onClick={() => setActiveView("preview")}
        >
          Preview CV
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <PdfPluginsProvider>
          <div
            className={cn(
              getMobileViewClassName("form"),
              "lg:flex w-full flex-col lg:w-[40%] lg:max-w-xl"
            )}
          >
            <div className="flex-1 overflow-y-auto bg-background">
              <TabbedEditorForm />
            </div>
          </div>

          <div
            className={cn(
              getMobileViewClassName("preview"),
              "lg:flex w-full flex-1 flex-col bg-slate-100"
            )}
          >
            <div className="flex-1 overflow-y-auto">
              <CVEditorPreview template={template} />
            </div>
          </div>
        </PdfPluginsProvider>
      </div>
    </>
  );
}
