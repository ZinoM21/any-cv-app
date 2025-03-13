"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash } from "lucide-react";
import { FormField } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { VolunteeringExperience } from "@/lib/types";
import { useProfileStore } from "@/hooks/use-profile";
import { EditorForm } from "./editor-form";
import VolunteeringFormFields from "./volunteering-form-fields";
import AddNewVolunteeringForm from "./add-new-volunteering-form";
import {
  editVolunteeringFormSchema,
  EditVolunteeringFormValues,
} from "../editor-forms-schemas";
import { EditorTabName } from "@/config/editor-tabs";

export function VolunteeringForm({ tabName }: { tabName: EditorTabName }) {
  const profileData = useProfileStore((state) => state.profile);

  const initialValues: EditVolunteeringFormValues = {
    volunteering:
      (profileData?.volunteering &&
        profileData.volunteering.map((vol) => ({
          role: vol.role || "",
          organization: vol.organization || "",
          organizationProfileUrl: vol.organizationProfileUrl || undefined,
          cause: vol.cause || "",
          startDate: vol.startDate || "",
          endDate: vol.endDate || undefined,
          description: vol.description || undefined,
        }))) ||
      [],
  };

  return (
    <EditorForm
      schema={editVolunteeringFormSchema}
      initialValues={initialValues}
      tabName={tabName}
    >
      <VolunteeringFieldArray />
    </EditorForm>
  );
}

const VolunteeringFieldArray = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { control } = useFormContext();

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "volunteering",
  });

  return (
    <div className="space-y-6">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Volunteering Experience
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {(fields as (VolunteeringExperience & { id: string })[]).map(
              (field, index) => (
                <AccordionItem
                  key={field.id}
                  value={`volunteering-${field.id}`}
                  className="border-none"
                >
                  <Card key={field.id}>
                    <CardHeader className="p-4">
                      <AccordionTrigger className="py-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">
                              <FormField
                                name={`volunteering.${index}.role`}
                                render={({ field }) =>
                                  field.value ? (
                                    <span>{field.value}</span>
                                  ) : (
                                    <span>Volunteering {index + 1}</span>
                                  )
                                }
                              />
                            </CardTitle>

                            <CardDescription>
                              <FormField
                                name={`volunteering.${index}.organization`}
                                render={({ field }) =>
                                  field.value ? (
                                    <span>{field.value}</span>
                                  ) : (
                                    <span>Organization {index + 1}</span>
                                  )
                                }
                              />
                            </CardDescription>
                          </div>
                        </div>
                      </AccordionTrigger>
                    </CardHeader>

                    <AccordionContent>
                      <CardContent className="px-4 pb-4 pt-0">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-slate-700">
                              Volunteering Details
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-red-500"
                              onClick={() => remove(index)}
                            >
                              <Trash className="size-4" />
                              Remove
                            </Button>
                          </div>

                          <VolunteeringFormFields
                            fieldNamePrefix={`volunteering.${index}`}
                          />
                        </div>
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      )}

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full h-20 rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500"
          >
            <Plus className="size-4" />
            Add Volunteering
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-4" side="right">
          <AddNewVolunteeringForm
            addToVolunteering={(data) => {
              prepend(data);
              setPopoverOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
