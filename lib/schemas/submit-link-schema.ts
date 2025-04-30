import { z } from "zod";

export const submitLinkFormSchema = z.object({
  linkedInUrl: z
    .string()
    .min(2, "Please enter a LinkedIn URL or username")
    .refine(
      (value) => {
        // Check if it's a valid LinkedIn URL
        const urlPattern =
          /^(?:https?:\/\/)?(?:[\w]+\.)?linkedin\.com\/in\/([\w\-]+)\/?.*$/;
        // Check if it's just a valid username
        const usernamePattern = /^[\w\-]+$/;
        return urlPattern.test(value) || usernamePattern.test(value);
      },
      {
        message: "Enter LinkedIn profile URL (/in/) or just your username"
      }
    ),
  turnstileToken: z
    .string()
    .min(1, "Please complete the security check")
    .optional()
});

export type SubmitLinkFormValues = z.infer<typeof submitLinkFormSchema>;
