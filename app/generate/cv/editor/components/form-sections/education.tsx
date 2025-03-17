"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Education } from "@/lib/types";
import Image from "next/image";
import { EditorForm } from "./editor-form";
import { useProfileStore } from "@/hooks/use-profile";
import EducationFormFields from "./education-form-fields";
import AddNewEducationForm from "./add-new-education-form";
import {
  EditEducationFormValues,
  editEducationFormSchema,
} from "../editor-forms-schemas";
import { useState } from "react";
import { EditorTabName } from "@/config/editor-tabs";

export function EducationForm({ tabName }: { tabName: EditorTabName }) {
  const profileData = useProfileStore((state) => state.profile);

  const initialValues: EditEducationFormValues = {
    education:
      (profileData?.education &&
        profileData.education.map((edu) => ({
          school: edu.school,
          schoolPictureUrl: edu.schoolPictureUrl || "",
          schoolProfileUrl: edu.schoolProfileUrl || "",
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy || "",
          startDate: edu.startDate,
          endDate: edu.endDate || "",
          grade: edu.grade || "",
          activities: edu.activities || "",
          description: edu.description || "",
        }))) ||
      [],
  };

  return (
    <EditorForm
      schema={editEducationFormSchema}
      initialValues={initialValues}
      tabName={tabName}
    >
      <EducationFieldArray />
    </EditorForm>
  );
}

export function EducationFieldArray() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { control } = useFormContext();
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "education",
  });

  // const handleSchoolPictureUpload = (index?: number) => {
  //   // In a real app, this would open a file picker and handle the upload
  //   const url = prompt("Enter URL for school picture (for demo purposes):");
  //   if (url) {
  //     // Update the form field
  //     if (typeof index === 'number') {
  //       // Update existing education
  //       control._fields.education[index].schoolPictureUrl = url;
  //     } else {
  //       // For new education entry
  //       append({
  //         school: "",
  //         degree: "",
  //         fieldOfStudy: "",
  //         startDate: "",
  //         endDate: "",
  //         grade: "",
  //         activities: "",
  //         description: "",
  //         schoolPictureUrl: url,
  //       });
  //     }
  //   }
  // };

  return (
    <div className="space-y-6">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Education
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {(fields as (Education & { id: string })[]).map((field, index) => (
              <AccordionItem
                key={field.id}
                value={`experience-${field.id}`}
                className="border-none"
              >
                <Card key={field.id}>
                  <CardHeader className="p-4">
                    <AccordionTrigger className="py-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {field.schoolPictureUrl ? (
                            <div className="size-10 overflow-hidden rounded-md bg-slate-100">
                              <Image
                                src={
                                  field?.schoolPictureUrl || "/placeholder.svg"
                                }
                                alt={field?.school}
                                width={80}
                                height={80}
                              />
                            </div>
                          ) : (
                            <div className="flex size-10 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 text-xs">
                              Logo
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-base">
                              <FormField
                                name={`education.${index}.degree`}
                                render={({ field }) =>
                                  field.value ? (
                                    <span>{field.value}</span>
                                  ) : (
                                    <span>Experience {index + 1}</span>
                                  )
                                }
                              />
                            </CardTitle>

                            <CardDescription>
                              <FormField
                                name={`education.${index}.school`}
                                render={({ field }) =>
                                  field.value ? (
                                    <span>{field.value}</span>
                                  ) : (
                                    <span>
                                      School of experience {index + 1}
                                    </span>
                                  )
                                }
                              />
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </CardHeader>

                  <AccordionContent>
                    <CardContent className="px-4 pb-4 pt-0">
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-slate-700">
                            Education Details
                          </h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-red-500"
                            onClick={() => remove(index)}
                          >
                            <Trash className="size-4" />
                            Remove
                          </Button>
                        </div>
                        <EducationFormFields
                          fieldNamePrefix={`education.${index}`}
                        />
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
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
            Add Education
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-4" side="right">
          <AddNewEducationForm
            addToEducations={(data) => {
              prepend(data);
              setPopoverOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
