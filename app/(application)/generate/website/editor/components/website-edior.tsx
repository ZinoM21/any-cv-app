"use client";

import { useEffect } from "react";

import { useProfileStore } from "@/hooks/use-profile";
import { ProfileData, WebsiteTemplate } from "@/lib/types";

import WebsiteEditorPreview from "./website-editor-preview";

import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TabbedEditorForm } from "@/components/editor-form/tabbed-editor-form";

export default function WebsiteEditor({
  profileData,
  template,
}: {
  profileData: ProfileData;
  template: WebsiteTemplate;
}) {
  const setProfileData = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    // Set initial profile data
    setProfileData(profileData);
  }, [profileData, setProfileData]);

  return (
    <SidebarProvider className="flex flex-col">
      <div className="flex flex-1">
        <Sidebar className="top-16 !h-[calc(100svh-)]">
          <SidebarContent>
            <TabbedEditorForm />
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <WebsiteEditorPreview templateId={template.id} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
