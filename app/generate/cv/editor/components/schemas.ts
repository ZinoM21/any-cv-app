// Position
export const positionSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  workSetting: z.string().optional().nullable(),
});

export type PositionSchemaValues = z.infer<typeof positionSchema>;

// Experience
export const experienceSchema = z.object({
  company: z.string(),
  companyProfileUrl: z.string().optional(),
  companyLogoUrl: z.string().optional(),
  positions: z.array(positionSchema),
});

export const experiencesFormSchema = z.object({
  experiences: z.array(experienceSchema),
});

export type ExperiencesFormValues = z.infer<typeof experiencesFormSchema>;

export const addNewExperienceFormSchema = experienceSchema;
export type AddNewExperienceFormValues = z.infer<
  typeof addNewExperienceFormSchema
>;

// Education
export const educationElementSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  activities: z.string().optional(),
  grade: z.string().optional(),
  schoolPictureUrl: z.string().optional(),
  schoolProfileUrl: z.string().optional(),
});

export const educationSchema = z.object({
  education: z.array(educationElementSchema),
});

export type EducationFormValues = z.infer<typeof educationSchema>;

export const addNewEducationFormSchema = educationElementSchema;
export type AddNewEducationFormValues = z.infer<
  typeof addNewEducationFormSchema
>;
