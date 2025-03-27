"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditorForm } from "../editor-form";
import { EditorTabName } from "@/config/editor-tab-names";
import {
  editSkillsFormSchema,
  EditSkillsFormValues,
} from "@/lib/editor-forms-schemas";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function SkillsForm({ tabName }: { tabName: EditorTabName }) {
  const { getSkillsInitialValues } = useEditorFormInitialValues();
  const initialValues = getSkillsInitialValues();

  return (
    <EditorForm
      schema={editSkillsFormSchema}
      initialValues={initialValues}
      tabName={tabName}
    >
      <SkillsFormFields />
    </EditorForm>
  );
}

const SkillsFormFields = () => {
  const { control } = useFormContext<EditSkillsFormValues>();
  const [newSkill, setNewSkill] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error: useFieldArray is not built for string arrays and returns type never
    name: "skills",
  });

  const isNewUniqueSkill = (skills: string[], newSkill: string) => {
    return (
      newSkill.trim() && !skills.some((skill) => skill === newSkill.trim())
    );
  };

  const addNewSkill = (skills: string[]) => {
    if (isNewUniqueSkill(skills, newSkill)) {
      append(newSkill.trim());
      setNewSkill("");
    }
  };

  return (
    <Card className="mb-60 mx-0.5">
      <CardHeader className="p-4">
        <CardTitle className="text-base">Add Skills</CardTitle>
        <CardDescription>
          Add relevant skills that showcase your expertise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <FormField
          control={control}
          name="skills"
          render={({ field }) => (
            <FormItem className="flex gap-2 space-y-0">
              <FormLabel htmlFor="newSkill" className="sr-only">
                New Skill
              </FormLabel>
              <div className="flex-1 space-y-2">
                <FormControl>
                  <Input
                    id="newSkill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addNewSkill(field.value);
                      }
                    }}
                    placeholder="e.g., JavaScript, Project Management, UX Design"
                  />
                </FormControl>
                <FormDescription>
                  Pro tip: Press Enter to quickly add a skill{" "}
                </FormDescription>
                <FormMessage />
              </div>
              <Button
                onClick={() => addNewSkill(field.value)}
                disabled={!isNewUniqueSkill(field.value, newSkill)}
              >
                <Plus className="mr-2 size-4" />
                Add
              </Button>
            </FormItem>
          )}
        />

        {fields.length > 0 && (
          <div className="space-y-2">
            <FormLabel>Your Skills</FormLabel>
            <div className="flex flex-wrap gap-2">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={control}
                  name={`skills.${index}`}
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
  );
};
