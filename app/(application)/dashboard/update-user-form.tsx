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

import { useUpdateUser } from "@/hooks/use-update-profile";

import useApi from "@/hooks/use-api";
import { getUser } from "@/lib/api/api";
import {
  updateUserSchema,
  type UpdateUserFormValues
} from "@/lib/schemas/user-schemas";
import type { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function UpdateUserForm({ user: initialUserData }: { user?: User }) {
  const api = useApi();
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(api),
    initialData: initialUserData
  });

  const { mutateAsync, isPending } = useUpdateUser();

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName
    }
  });

  const { isValid, isDirty } = form.formState;

  const update = async (values: UpdateUserFormValues) => {
    return await mutateAsync(values, {
      onSuccess: (data) => {
        form.reset({ firstName: data.firstName, lastName: data.lastName });
        router.refresh();
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => await update(values))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  {...field}
                />
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          disabled={isPending || !isValid || !isDirty}
        >
          {isPending ? "Updating..." : "Update Account"}
        </Button>
      </form>
    </Form>
  );
}
