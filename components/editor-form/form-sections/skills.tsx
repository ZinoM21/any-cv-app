"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorTabName } from "@/config/editor-tab-names";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";
import {
  editSkillsFormSchema,
  EditSkillsFormValues,
} from "@/lib/schemas/editor-forms-schemas";
import { EditorForm } from "../editor-form";

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
    <div className="grid gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Add Skills</h3>

      <FormField
        control={control}
        name="skills"
        render={({ field }) => (
          <div className="flex gap-2">
            <FormItem className="flex-1 flex flex-col gap-2 space-y-0">
              <FormLabel htmlFor="newSkill" className="sr-only">
                New Skill
              </FormLabel>
              <FormControl>
                <Input
                  id="newLanguage"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addNewSkill(field.value);
                    }
                  }}
                  placeholder="e.g., JavaScript, Project Management, UX Design"
                  className="h-8"
                />
              </FormControl>
              <FormDescription>
                Add languages you speak (e.g., &quot;English - Fluent&quot;,
                &quot;Spanish - Native&quot;).
              </FormDescription>
              <FormMessage />
            </FormItem>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addNewSkill(field.value)}
              disabled={!isNewUniqueSkill(field.value, newSkill)}
            >
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </div>
        )}
      />

      {fields.length > 0 && (
        <div className="space-y-2">
          <FormLabel>
            <h3 className="text-sm font-medium text-muted-foreground">
              Added Skills
            </h3>
          </FormLabel>
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={control}
                name={`skills.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <Badge variant="secondary">
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
    </div>
  );
};
