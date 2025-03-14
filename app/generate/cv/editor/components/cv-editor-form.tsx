"use client";

import { useShallow } from "zustand/react/shallow";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  editorTabFormComponentMap,
  EditorTabName,
  editorTabName,
} from "@/config/editor-tabs";
import { useEditorTabStore } from "@/hooks/use-editor-tabs";
import { capitalize } from "@/lib/utils";

export function CVEditorForm({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useEditorTabStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  const getFormComponent = (tabName: EditorTabName) => {
    const Component = editorTabFormComponentMap[tabName];
    return <Component tabName={tabName} />;
  };

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
          <Tabs
            value={activeTab}
            onValueChange={(string) => setActiveTab(string as EditorTabName)}
          >
            <TabsList className="mb-6 w-full">
              {Object.values(editorTabName).map((tabName) => (
                <TabsTrigger
                  key={tabName}
                  value={tabName}
                  className="grow min-w-0 px-1"
                >
                  <span className="overflow-hidden text-ellipsis">
                    {capitalize(tabName)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.values(editorTabName).map((tabName) => (
              <TabsContent key={tabName} value={tabName}>
                {getFormComponent(tabName)}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
