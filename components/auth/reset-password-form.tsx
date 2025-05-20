"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

import useApi from "@/hooks/use-api";
import { useAuth } from "@/hooks/use-auth";
import { resetPassword } from "@/lib/api";
import { ApiErrorType } from "@/lib/errors";
import {
  ResetPasswordFormValues,
  resetPasswordSchema
} from "@/lib/schemas/auth-schema";
import { toast } from "sonner";
import { PasswordInput } from "./PasswordInput";

export function ResetPasswordForm({ token }: { token?: string }) {
  const router = useRouter();
  const api = useApi();

  const { signIn } = useAuth();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
    mode: "all"
  });

  const { isDirty, isValid } = form.formState;

  const { mutate: reset, isPending } = useMutation({
    mutationFn: async (values: ResetPasswordFormValues) =>
      await resetPassword(api, values, token),
    onSuccess: async ({ email }, { password }) => {
      if (!email) {
        router.push("/signin");
        return;
      }

      const credentials = {
        email,
        password
      };

      await signIn(credentials, {
        redirect: token ? true : false,
        redirectTo: token ? "/dashboard" : undefined,
        onSuccess: async () => {
          toast.success("Password reset successful", {
            description: "Your password has been reset."
          });
          form.reset();
        }
      });
    },
    onError: (error) => {
      if (error.message === ApiErrorType.ResourceNotFound) {
        toast.error("Password reset failed", {
          description:
            "The password reset link is invalid or has expired. Please go back to sign in and request a new link."
        });
      }
      if (error.message === ApiErrorType.BadRequest) {
        toast.error("Password reset failed", {
          description:
            "New password cannot be the same as the old password. Please try again."
        });
      }
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => reset(values))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="••••••••" {...field} />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your new password"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={token && "w-full"}
          variant={token ? "default" : "outline"}
          disabled={isPending || !isValid || !isDirty}
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
}
