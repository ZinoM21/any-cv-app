"use client";

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
import { useFieldArray } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { EditSummaryFormValues } from "@/lib/editor-forms-schemas";
import { Badge } from "@/components/ui/badge";

export const SummaryFormFields = () => {
  const { control } = useFormContext<EditSummaryFormValues>();
  const [newLanguage, setNewLanguage] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error: useFieldArray is not built for string arrays and returns type never
    name: "languages",
  });

  const isNewUniqueLanguage = (languages: string[], newLanguage: string) => {
    return (
      newLanguage.trim() &&
      !languages.some((language) => language === newLanguage.trim())
    );
  };

  const addNewLanguage = (languages: string[]) => {
    if (isNewUniqueLanguage(languages, newLanguage)) {
      append(newLanguage.trim());
      setNewLanguage("");
    }
  };

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

      <Card className="mx-0.5">
        <CardHeader className="p-4">
          <CardTitle className="text-base">Languages</CardTitle>
          <CardDescription>
            Add languages you speak (e.g., &quot;English - Fluent&quot;,
            &quot;Spanish - Intermediate&quot;)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0">
          <FormField
            control={control}
            name="languages"
            render={({ field }) => (
              <FormItem className="flex gap-2 space-y-0">
                <FormLabel htmlFor="newLanguage" className="sr-only">
                  New Language
                </FormLabel>
                <div className="flex-1 space-y-2">
                  <FormControl>
                    <Input
                      id="newLanguage"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addNewLanguage(field.value);
                        }
                      }}
                      placeholder="e.g., JavaScript, Project Management, UX Design"
                      className="h-8"
                    />
                  </FormControl>
                  <FormDescription>
                    Pro tip: Press Enter to quickly add a language{" "}
                  </FormDescription>
                  <FormMessage />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addNewLanguage(field.value)}
                  disabled={!isNewUniqueLanguage(field.value, newLanguage)}
                >
                  <Plus className="mr-2 size-4" />
                  Add
                </Button>
              </FormItem>
            )}
          />

          {fields.length > 0 && (
            <div className="space-y-2">
              <FormLabel>Your Languages</FormLabel>
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={control}
                    name={`languages.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <Badge variant="outline">
                          {field.value}
                          <Button
                            type="button"
                            variant="ghost"
                            className="ml-1 size-5 p-1"
                            onClick={() => remove(index)}
                          >
                            <X className="size-3" />
                          </Button>
                        </Badge>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
