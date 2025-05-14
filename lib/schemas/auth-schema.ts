import { z } from "zod";

export const passwordRequirements = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" }
] as const;

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email");
export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")
  .regex(passwordRequirements[1].regex, passwordRequirements[1].text)
  .regex(passwordRequirements[2].regex, passwordRequirements[2].text)
  .regex(passwordRequirements[3].regex, passwordRequirements[3].text);

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(1, "First name is required"),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(1, "Last name is required"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string({ required_error: "Please confirm your password" })
      .min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z
      .string({ required_error: "Please confirm your password" })
      .min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
