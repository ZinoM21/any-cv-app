import {
  EditorTabName,
  SUMMARY,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  VOLUNTEERING,
} from "./editor-tab-names";
import { EducationForm } from "@/app/generate/cv/editor/components/form-sections/education";
import { ExperiencesForm } from "@/app/generate/cv/editor/components/form-sections/experience";
import { SkillsForm } from "@/app/generate/cv/editor/components/form-sections/skills";
import { SummaryForm } from "@/app/generate/cv/editor/components/form-sections/summary";
import { VolunteeringForm } from "@/app/generate/cv/editor/components/form-sections/volunteering";

export const editorTabFormComponentMap: {
  [P in EditorTabName]: React.FC<{ tabName: EditorTabName }>;
} = {
  [SUMMARY]: SummaryForm,
  [EXPERIENCE]: ExperiencesForm,
  [EDUCATION]: EducationForm,
  [SKILLS]: SkillsForm,
  [VOLUNTEERING]: VolunteeringForm,
};

export * from "./editor-tab-names";
