"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useAuth } from "@/hooks/use-auth";
import { SignUpFormValues, signUpSchema } from "@/lib/schemas/auth-schema";
import { cn } from "@/lib/utils";

export function SignUpForm({
  className,
  onSuccess,
  redirect = true,
  ...props
}: React.ComponentProps<"form"> & {
  onSuccess?: () => Promise<void>;
  redirect?: boolean;
}) {
  const { signIn, signUp, isLoading, error } = useAuth();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const submit = form.handleSubmit(
    async (credentials) => await signUp(credentials, { redirect, onSuccess })
  );

  return (
    <Form {...form}>
      <form onSubmit={submit} className={cn("space-y-4", className)} {...props}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <div className="text-sm text-destructive">{error}</div>}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || form.formState.isSubmitting}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0 font-normal"
            onClick={() => signIn()} // redirect to /signin
          >
            Sign In
          </Button>
        </p>
      </form>
    </Form>
  );
}
