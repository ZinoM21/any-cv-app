"use client";

import { useProfileStore } from "@/hooks/use-profile";
import { ProfileData } from "@/lib/types";
import { useEffect, useState } from "react";
import { CVEditorForm } from "./cv-editor-form";
import { CVEditorPreview } from "./cv-editor-preview";
import { cn } from "@/lib/utils";

export default function CVEditor({
  profileData,
  templateId,
}: {
  profileData: ProfileData;
  templateId: string;
}) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeView, setActiveView] = useState<"form" | "preview">("form");
  const setProfileData = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    // Set initial profile data
    setProfileData(profileData);

    // Check for mobile view
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [profileData, setProfileData]);

  return (
    <>
      {isMobileView && (
        <div className="flex w-full border-b bg-white">
          <button
            className={`flex-1 border-b-2 py-4 text-center font-medium ${
              activeView === "form"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600"
            }`}
            onClick={() => setActiveView("form")}
          >
            Edit Information
          </button>
          <button
            className={`flex-1 border-b-2 py-4 text-center font-medium ${
              activeView === "preview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600"
            }`}
            onClick={() => setActiveView("preview")}
          >
            Preview CV
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`${
            isMobileView && activeView !== "form" ? "hidden" : "flex"
          } w-full flex-col lg:w-[40%] lg:max-w-xl`}
        >
          <div className="flex-1 overflow-y-auto bg-white">
            <CVEditorForm username={profileData.username} />
          </div>
        </div>

        <div
          className={cn(
            isMobileView && activeView !== "preview" ? "hidden" : "flex",
            "w-full flex-1 flex-col bg-slate-100"
          )}
        >
          <div className="flex-1 overflow-y-auto">
            <CVEditorPreview templateId={templateId} />
          </div>
        </div>
      </div>
    </>
  );
}
