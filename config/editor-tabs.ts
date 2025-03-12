import { EducationForm } from "@/app/generate/cv/editor/components/form-sections/education";
import { ExperiencesForm } from "@/app/generate/cv/editor/components/form-sections/experience";
import { SkillsForm } from "@/app/generate/cv/editor/components/form-sections/skills";
import { SummaryForm } from "@/app/generate/cv/editor/components/form-sections/summary";
import { VolunteeringForm } from "@/app/generate/cv/editor/components/form-sections/volunteering";

export type EditorTab = {
  name: string;
  label: string;
  FormComponent: React.FC<{
    changeToNextTab: (value?: string) => void;
    activeTab: EditorTab["name"];
    tab: EditorTab;
  }>;
};

export const editorTabs: EditorTab[] = [
  { name: "summary", label: "Summary", FormComponent: SummaryForm },
  { name: "experience", label: "Experience", FormComponent: ExperiencesForm },
  { name: "education", label: "Education", FormComponent: EducationForm },
  { name: "skills", label: "Skills", FormComponent: SkillsForm },
  {
    name: "volunteering",
    label: "Volunteering",
    FormComponent: VolunteeringForm,
  },
];
