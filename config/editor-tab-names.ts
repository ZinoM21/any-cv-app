// First file - just for constants and types
export const SUMMARY = "summary" as const;
export const EXPERIENCE = "experience" as const;
export const EDUCATION = "education" as const;
export const SKILLS = "skills" as const;
export const VOLUNTEERING = "volunteering" as const;

export const editorTabName = {
  Summary: SUMMARY,
  Experience: EXPERIENCE,
  Education: EDUCATION,
  Skills: SKILLS,
  Volunteering: VOLUNTEERING,
} as const;

export type EditorTabName = typeof editorTabName[keyof typeof editorTabName]; 