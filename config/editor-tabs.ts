// import { EducationForm } from "@/app/generate/cv/editor/components/form-sections/education";
// import { ExperiencesForm } from "@/app/generate/cv/editor/components/form-sections/experience";
// import { SkillsForm } from "@/app/generate/cv/editor/components/form-sections/skills";
// import { SummaryForm } from "@/app/generate/cv/editor/components/form-sections/summary";
// import { VolunteeringForm } from "@/app/generate/cv/editor/components/form-sections/volunteering";
import { EditorTab } from "@/lib/types";

// Define tab metadata separately from components
export const editorTabsConfig: Pick<EditorTab, "name" | "label">[] = [
  { name: "summary", label: "Summary" },
  { name: "experience", label: "Experience" },
  { name: "education", label: "Education" },
  { name: "skills", label: "Skills" },
  { name: "volunteering", label: "Volunteering" },
] as const;

// Lazy load components to avoid circular dependencies
export const getEditorTabs = (): EditorTab[] => [
  {
    name: editorTabsConfig[0].name,
    label: editorTabsConfig[0].label,
    FormComponent:
      require("@/app/generate/cv/editor/components/form-sections/summary")
        .SummaryForm,
  },
  {
    name: editorTabsConfig[1].name,
    label: editorTabsConfig[1].label,
    FormComponent:
      require("@/app/generate/cv/editor/components/form-sections/experience")
        .ExperiencesForm,
  },
  {
    name: editorTabsConfig[2].name,
    label: editorTabsConfig[2].label,
    FormComponent:
      require("@/app/generate/cv/editor/components/form-sections/education")
        .EducationForm,
  },
  {
    name: editorTabsConfig[3].name,
    label: editorTabsConfig[3].label,
    FormComponent:
      require("@/app/generate/cv/editor/components/form-sections/skills")
        .SkillsForm,
  },
  {
    name: editorTabsConfig[4].name,
    label: editorTabsConfig[4].label,
    FormComponent:
      require("@/app/generate/cv/editor/components/form-sections/volunteering")
        .VolunteeringForm,
  },
];
