"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUser, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { extractUsernameFromLinkedInUrl } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z.object({
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
        message: "Enter LinkedIn profile URL (/in/) or just your username",
      }
    ),
});

export function SubmitLinkForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedInUrl: "",
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (username: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: username }),
        }
      );

      if (response.status === 404) {
        throw new Error("This Profile does not exits, try again");
      }

      if (!response.ok) {
        throw new Error("Failed to generate CV");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log(data);
      router.push(`/generate/${data.username}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const username = extractUsernameFromLinkedInUrl(values.linkedInUrl);
    mutation.mutate(username);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-2"
        noValidate
      >
        <FormField
          control={form.control}
          name="linkedInUrl"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  type="text"
                  placeholder="linkedin.com/in/first-last"
                  className="bg-white shadow-[0_0_15px_hsl(var(--primary)_/_0.3)]"
                  required
                  {...field}
                />
              </FormControl>
              {form.formState.errors.linkedInUrl ? (
                <FormMessage />
              ) : (
                <FormDescription>Enter link or username</FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Generating..." : "Generate CV"}
          {mutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <FileUser />
          )}
        </Button>
      </form>
    </Form>
  );
}
