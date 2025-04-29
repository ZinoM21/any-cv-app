import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { EditSummaryFormValues } from "@/lib/schemas/editor-forms-schemas";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function LanguageFormFields() {
  const [newLanguage, setNewLanguage] = useState("");

  const { control } = useFormContext<EditSummaryFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error: useFieldArray is not build for string arrays and returns type never
    name: "languages"
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
      <FormField
        control={control}
        name="languages"
        render={({ field }) => (
          <div className="flex gap-2">
            <FormItem className="flex flex-1 flex-col gap-2 space-y-0">
              <FormLabel htmlFor="newLanguage" className="sr-only">
                New Language
              </FormLabel>
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
                  placeholder="English - Fluent"
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
              onClick={() => addNewLanguage(field.value)}
              disabled={!isNewUniqueLanguage(field.value, newLanguage)}
            >
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </div>
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
    </>
  );
}
