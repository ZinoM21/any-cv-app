"use client";

import { useShallow } from "zustand/react/shallow";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { editorTabsConfig, getEditorTabs } from "@/config/editor-tabs";
import { useEditorTabStore } from "@/hooks/use-editor-tabs";

export function CVEditorForm({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useEditorTabStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  const editorTabs = getEditorTabs();

  return (
    <div className="flex h-full flex-col border-r">
      {/* Header */}
      <div className="z-10 flex items-center justify-between border-b px-4 py-5">
        <div className="flex items-center gap-2">
          <Link
            href={`/generate/cv/template?username=${username}`}
            className="rounded-full p-1 hover:bg-slate-100"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900">Edit Your CV</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full">
              {editorTabsConfig.map((tab) => (
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

            {editorTabs.map((tab) => (
              <TabsContent key={tab.name} value={tab.name}>
                <tab.FormComponent tab={tab} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
