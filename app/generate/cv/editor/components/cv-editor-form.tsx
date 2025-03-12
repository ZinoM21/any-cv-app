"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save } from "lucide-react";
import Link from "next/link";
import { editorTabs } from "@/config/editor-tabs";

export function CVEditorForm({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState(editorTabs[0].name);

  const handleSave = () => {
    // In a real app, this would save to a database
    alert("CV data saved successfully!");
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading PDF...");
  };

  return (
    <div className="flex h-full flex-col border-r">
      {/* Header */}
      <div className="z-10 flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/generate/cv/template?username=${username}`}
            className="rounded-full p-1 hover:bg-slate-100"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900">Edit Your CV</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full">
              {editorTabs.map((tab) => (
                <TabsTrigger
                  key={tab.name}
                  value={tab.name}
                  className="grow min-w-0 px-1"
                >
                  <span className="overflow-hidden text-ellipsis">
                    {tab.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {editorTabs.map((tab, index) => (
              <TabsContent key={tab.name} value={tab.name}>
                <tab.FormComponent
                  changeToNextTab={(value) => {
                    const nextTab = editorTabs[index + 1]?.name;
                    setActiveTab(value || nextTab);
                  }}
                  activeTab={activeTab}
                  tab={tab}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
