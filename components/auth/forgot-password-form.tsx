"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/lib/api";
import { createApiClient } from "@/lib/api/api-client";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema
} from "@/lib/schemas/auth-schema";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  // Define form
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  const {
    formState: { isDirty, isValid }
  } = form;

  // Use React Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ForgotPasswordFormValues) => {
      const api = createApiClient();
      return await forgotPassword(api, values.email);
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Check your email", {
        description:
          "If your email exists in our system, you will receive a password reset link."
      });
    },
    onError: () => {
      // Don't show specific errors for security reasons
      toast.error("Something went wrong", {
        description: "Please try again later."
      });
    }
  });

  if (isSuccess) {
    return (
      <div className="space-y-4">
        <p>
          If your email exists in our system, you will receive a password reset
          link shortly.
        </p>
        <p>Please check your inbox (and spam folder) for an email from us.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your.email@example.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || !isValid || !isDirty}
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </Form>
  );
}
