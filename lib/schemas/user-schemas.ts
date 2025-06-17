import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name is required"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required")
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
