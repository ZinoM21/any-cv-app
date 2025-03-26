import { z } from "zod";

// Summary
export const editSummaryFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  headline: z.string().optional(),
  about: z.string().optional(),
});

export type EditSummaryFormValues = z.infer<typeof editSummaryFormSchema>;

// Position
export const positionSchema = z.object({
  title: z.string().min(1, "Enter a job title"),
  startDate: z.coerce.date({ required_error: "Enter a start date" }),
  endDate: z.coerce.date().optional(),
  duration: z.string().optional().nullable(),
  description: z.string().optional(),
  location: z.string().optional(),
  workSetting: z.string().optional().nullable(),
});

const editPositionSchema = z
  .array(positionSchema)
  .min(1, "At least one position is required");

export const addNewPositionFormSchema = positionSchema;
export type AddNewPositionFormValues = z.infer<typeof addNewPositionFormSchema>;

// Experience
const experienceSchema = z.object({
  company: z.string().min(1, "Enter a company name"),
  companyProfileUrl: z.string().optional(),
  companyLogoUrl: z.string().optional(),
  positions: editPositionSchema,
});

export const editExperiencesFormSchema = z.object({
  experiences: z.array(experienceSchema),
});

export type EditExperiencesFormValues = z.infer<
  typeof editExperiencesFormSchema
>;

export const addNewExperienceFormSchema = experienceSchema;
export type AddNewExperienceFormValues = z.infer<
  typeof addNewExperienceFormSchema
>;

// Education
const educationSchema = z.object({
  school: z.string().min(1, "Enter a school name"),
  degree: z.string().min(1, "Enter a degree"),
  startDate: z.coerce.date({ required_error: "Enter a start date" }),
  endDate: z.coerce.date().optional(),
  fieldOfStudy: z.string().optional(),
  description: z.string().optional(),
  activities: z.string().optional(),
  grade: z.string().optional(),
  schoolPictureUrl: z.string().optional(),
  schoolProfileUrl: z.string().optional(),
});

export const editEducationFormSchema = z.object({
  education: z.array(educationSchema),
});

export type EditEducationFormValues = z.infer<typeof editEducationFormSchema>;

export const addNewEducationFormSchema = educationSchema;
export type AddNewEducationFormValues = z.infer<
  typeof addNewEducationFormSchema
>;

// Skills
export const skillSchema = z.string().max(80, "Skill is too long");

export const editSkillsFormSchema = z.object({
  skills: z.array(skillSchema),
});
export type EditSkillsFormValues = z.infer<typeof editSkillsFormSchema>;

// Volunteering
const volunteeringSchema = z.object({
  role: z.string().min(1, "Enter a role"),
  organization: z.string().min(1, "Enter an organization"),
  startDate: z.coerce.date({ required_error: "Enter a start date" }),
  endDate: z.coerce.date().optional(),
  description: z.string().optional(),
  organizationProfileUrl: z.string().optional(),
  organizationLogoUrl: z.string().optional(),
  cause: z.string().optional(),
});

export const editVolunteeringFormSchema = z.object({
  volunteering: z.array(volunteeringSchema),
});

export type EditVolunteeringFormValues = z.infer<
  typeof editVolunteeringFormSchema
>;

export const addNewVolunteeringFormSchema = volunteeringSchema;
export type AddNewVolunteeringFormValues = z.infer<
  typeof addNewVolunteeringFormSchema
>;
