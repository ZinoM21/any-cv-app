import { z } from "zod";

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email");
export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters");

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
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
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),
    password: passwordSchema,
    confirmPassword: z
      .string({ required_error: "Please confirm your password" })
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
