import { z } from "zod";

// Summary
export const editSummaryFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  headline: z.string().max(100, "Keep it short! Maximum 100 characters").optional(),
  about: z.string().max(2600, "Input too long! Maximum 2600 characters").optional(),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().optional(),
  location: z.string().optional(),
  languages: z.array(z.string()),
  profilePictureUrl: z.string().optional()
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
  workSetting: z.string().optional().nullable()
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
  positions: editPositionSchema
});

export const editExperiencesFormSchema = z.object({
  experiences: z.array(experienceSchema)
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
  schoolProfileUrl: z.string().optional()
});

export const editEducationFormSchema = z.object({
  education: z.array(educationSchema)
});

export type EditEducationFormValues = z.infer<typeof editEducationFormSchema>;

export const addNewEducationFormSchema = educationSchema;
export type AddNewEducationFormValues = z.infer<
  typeof addNewEducationFormSchema
>;

// Skills
export const skillSchema = z.string().max(80, "Skill is too long");

export const editSkillsFormSchema = z.object({
  skills: z.array(skillSchema)
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
  cause: z.string().optional()
});

export const editVolunteeringFormSchema = z.object({
  volunteering: z.array(volunteeringSchema)
});

export type EditVolunteeringFormValues = z.infer<
  typeof editVolunteeringFormSchema
>;

export const addNewVolunteeringFormSchema = volunteeringSchema;
export type AddNewVolunteeringFormValues = z.infer<
  typeof addNewVolunteeringFormSchema
>;

// Projects
const projectSchema = z.object({
  title: z.string().min(1, "Enter a project title"),
  startDate: z.coerce.date({ required_error: "Enter a start date" }),
  endDate: z.coerce.date().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  associatedWith: z.string().optional(),
  thumbnail: z.string().optional()
});

export const editProjectsFormSchema = z.object({
  projects: z.array(projectSchema)
});

export type EditProjectsFormValues = z.infer<typeof editProjectsFormSchema>;

export const addNewProjectFormSchema = projectSchema;
export type AddNewProjectFormValues = z.infer<typeof addNewProjectFormSchema>;
