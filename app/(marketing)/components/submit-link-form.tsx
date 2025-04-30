"use client";

import TurnstileInput from "@/components/auth/turnstile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateProfileMutation } from "@/hooks/use-create-profile-mutation";
import { useProfileStore } from "@/hooks/use-profile";
import type { SubmitLinkFormValues } from "@/lib/schemas/submit-link-schema";
import { submitLinkFormSchema } from "@/lib/schemas/submit-link-schema";
import { ProfileData } from "@/lib/types";
import { buildQueryString, extractUsernameFromLinkedInUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, FileUser, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;

export function SubmitLinkForm() {
  const form = useForm<SubmitLinkFormValues>({
    resolver: zodResolver(submitLinkFormSchema),
    defaultValues: {
      linkedInUrl: ""
    }
  });

  const { push } = useRouter();
  const params = useSearchParams();

  const setProfileData = useProfileStore((state) => state.setProfile);

  const { mutate, isPending, isSuccess } = useCreateProfileMutation();

  function onSubmit(values: SubmitLinkFormValues) {
    const username = extractUsernameFromLinkedInUrl(values.linkedInUrl);
    mutate(
      { linkedInUrl: username, turnstileToken: values.turnstileToken },
      {
        onSuccess: (data: ProfileData) => {
          setProfileData(data);
          push(
            `/generate/choose?${buildQueryString(params, {
              set: { username: data.username }
            })}`
          );
        }
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <FormField
            control={form.control}
            name="linkedInUrl"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="linkedin.com/in/first-last"
                    className="bg-background shadow-[0_0_15px_hsl(var(--primary)_/_0.3)]"
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
          <div>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isPending || !form.watch("turnstileToken")}
            >
              {isPending ? "Generating..." : "Generate"}
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : isSuccess ? (
                <Check />
              ) : (
                <FileUser />
              )}
            </Button>
            <div className="mt-2 text-sm text-gray-500">It&apos;s free!</div>
          </div>
        </div>
        {SITE_KEY && (
          <>
            <FormField
              control={form.control}
              name="turnstileToken"
              render={() => (
                <FormItem>
                  <FormControl>
                    <TurnstileInput
                      siteKey={SITE_KEY}
                      size="flexible"
                      action="landing-page"
                      onVerify={(token) => {
                        form.setValue("turnstileToken", token);
                      }}
                      onError={(error) => {
                        form.setError("turnstileToken", {
                          message: error
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </form>
    </Form>
  );
}
