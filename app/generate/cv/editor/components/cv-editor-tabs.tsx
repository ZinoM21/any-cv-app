"use client";

import { useShallow } from "zustand/react/shallow";

import { capitalize } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEditorTabStore } from "@/hooks/use-editor-tabs";
import {
  SUMMARY,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  VOLUNTEERING,
  EditorTabName,
  editorTabName,
} from "@/config/editor-tab-names";

import { EducationForm } from "./form-sections/education";
import { ExperiencesForm } from "./form-sections/experience";
import { SkillsForm } from "./form-sections/skills";
import { SummaryForm } from "./form-sections/summary";
import { VolunteeringForm } from "./form-sections/volunteering";

const editorTabFormComponentMap: {
  [P in EditorTabName]: React.FC<{ tabName: EditorTabName }>;
} = {
  [SUMMARY]: SummaryForm,
  [EXPERIENCE]: ExperiencesForm,
  [EDUCATION]: EducationForm,
  [SKILLS]: SkillsForm,
  [VOLUNTEERING]: VolunteeringForm,
};

export function CVEditorTabs() {
  const [activeTab, setActiveTab] = useEditorTabStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  const getFormComponent = (tabName: EditorTabName) => {
    const Component = editorTabFormComponentMap[tabName];
    return <Component tabName={tabName} />;
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(string) => setActiveTab(string as EditorTabName)}
      className="flex flex-col h-full border-r overflow-hidden px-6 pt-6 gap-6"
    >
      <TabsList className="w-full flex-shrink-0">
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
        <TabsContent key={tabName} value={tabName} className="overflow-hidden">
          {getFormComponent(tabName)}
        </TabsContent>
      ))}
    </Tabs>
  );
}
