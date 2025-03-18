import { z } from "zod";

// Position
export const positionSchema = z.object({
  title: z.string().min(1, "Enter a job title"),
  startDate: z.string().min(1, "Enter a start date"),
  endDate: z.string().optional(),
  duration: z.string().optional().nullable(),
  description: z.string().optional(),
  location: z.string().optional(),
  workSetting: z.string().optional().nullable(),
});

export const addNewPositionSchema = positionSchema;
export type AddNewPositionSchemaValues = z.infer<typeof addNewPositionSchema>;

// Experience
export const experienceSchema = z.object({
  company: z.string().min(1, "Enter a company name"),
  companyProfileUrl: z.string().optional(),
  companyLogoUrl: z.string().optional(),
  positions: z
    .array(positionSchema)
    .min(1, "At least one position is required"),
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
export const educationSchema = z.object({
  school: z.string().min(1, "Enter a school name"),
  degree: z.string().min(1, "Enter a degree"),
  startDate: z.string().min(1, "Enter a start date"),
  endDate: z.string().optional(),
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
export const skillsSchema = z.array(z.string());

export const editSkillsFormSchema = z.object({
  skills: skillsSchema,
});

export type EditSkillsFormValues = z.infer<typeof editSkillsFormSchema>;

// Volunteering
export const volunteeringSchema = z.object({
  role: z.string().min(1, "Enter a role"),
  organization: z.string().min(1, "Enter an organization"),
  organizationProfileUrl: z.string().optional(),
  organizationLogoUrl: z.string().optional(),
  cause: z.string().optional(),
  startDate: z.string().min(1, "Enter a start date"),
  endDate: z.string().optional(),
  description: z.string().optional(),
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
