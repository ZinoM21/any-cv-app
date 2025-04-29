"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

import { Image } from "@/components/editor-form/form-sections/image";
import { ImageInput } from "@/components/editor-form/form-sections/image-input";
import { Separator } from "@/components/ui/separator";
import LanguageFormFields from "./language-form-fields";

export const SummaryFormFields = () => {
  const { control, getValues } = useFormContext();

  const fullName = `${getValues("firstName") || ""} ${
    getValues("lastName") || ""
  }`.trim();

  return (
    <>
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
              A brief statement that appears under your name. (Recommended: max
              10 words)
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

      <FormField
        control={control}
        name="profilePictureUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Picture</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Image
                  src={field?.value}
                  alt={fullName}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
                <ImageInput
                  field={field}
                  label="Change Photo"
                  fileName="profile_picture"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator className="mt-4" />

      <h3 className="font-medium">Languages</h3>

      <LanguageFormFields />
    </>
  );
};
