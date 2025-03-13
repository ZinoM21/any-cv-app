"use client";

import { z } from "zod";

import { useProfileStore } from "@/hooks/use-profile";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { EditorForm } from "./editor-form";
import { useFormContext } from "react-hook-form";
import { EditorTabName } from "@/config/editor-tabs";

const summaryFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  headline: z.string().optional(),
  about: z.string().optional(),
});

export function SummaryForm({ tabName }: { tabName: EditorTabName }) {
  const profileData = useProfileStore((state) => state.profile);

  const initialValues = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    // headline: profileData?.headline || "",
    // about: profileData?.about || "",
  };

  // const handleProfilePictureUpload = () => {
  //   // In a real app, this would open a file picker and handle the upload
  //   const url = prompt("Enter URL for profile picture (for demo purposes):");
  //   if (url) {
  //     setValue("profilePictureUrl", url, {
  //       shouldDirty: true,
  //       shouldValidate: true,
  //     });
  //   }
  // };

  // const initials =
  //     (profileData?.firstName?.[0]?.toUpperCase() || "") +
  //         (profileData?.lastName?.[0]?.toUpperCase() || "") || "JD";

  return (
    <EditorForm
      schema={summaryFormSchema}
      initialValues={initialValues}
      tabName={tabName}
    >
      <SummaryFormFields />
    </EditorForm>
  );
}

const SummaryFormFields = () => {
  const { control } = useFormContext();

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="headline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Headline</FormLabel>
            <FormControl>
              <Input
                placeholder="Full-stack developer with 5+ years of experience"
                {...field}
              />
            </FormControl>
            <FormDescription>
              A brief statement that appears under your name
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="about"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Driven Engineer with 5 years of experience in ... "
                rows={5}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide a comprehensive overview of your professional background,
              skills, and achievements
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* TODO: PROFILE PICTURE */}
      {/* <FormField
              control={control}
              name="profilePictureUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <div className="flex items-center gap-4">
                    <Avatar className="size-16">
                      <AvatarImage src={field.value} alt="profile picture" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>

                    <FormControl>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleProfilePictureUpload}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            /> */}
    </div>
  );
};
