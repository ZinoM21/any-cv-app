"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Image from "next/image";
import { EditorForm } from "../editor-form";
import EducationFormFields from "./education-form-fields";
import AddNewEducationForm from "./add-new-education-form";
import {
  editEducationFormSchema,
  EditEducationFormValues,
} from "@/lib/editor-forms-schemas";
import { useState } from "react";
import { EditorTabName } from "@/config/editor-tab-names";
import { cn } from "@/lib/utils";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";

export function EducationForm({ tabName }: { tabName: EditorTabName }) {
  const { getEducationInitialValues } = useEditorFormInitialValues();
  const initialValues = getEducationInitialValues();

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

const EducationFieldArray = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { control } = useFormContext<EditEducationFormValues>();
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
    <div className="space-y-6 mb-60">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Education
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {fields.map((field, index) => (
              <AccordionItem
                key={field.id}
                value={`experience-${field.id}`}
                className="border-none"
              >
                <Card key={field.id}>
                  <CardHeader className="p-4">
                    <AccordionTrigger className="py-0 min-w-0">
                      <div className="flex flex-1 items-start justify-between min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          {field.schoolPictureUrl ? (
                            <div className="size-10 min-w-10 overflow-hidden rounded-md bg-slate-100">
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
                          <div className="min-w-0">
                            <CardTitle className="text-base">
                              <FormField
                                name={`education.${index}.degree`}
                                render={({ field }) =>
                                  field.value ? (
                                    <span className="block truncate">
                                      {field.value}
                                    </span>
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
                                    <span className="block truncate">
                                      {field.value}
                                    </span>
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
                        <div className="flex items-center justify-between border-b pb-1">
                          <h4 className="text-base font-medium text-slate-800">
                            Education Details
                          </h4>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-red-500"
                              >
                                <Trash />
                                Remove
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently remove this education entry from
                                  our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className={cn(
                                    buttonVariants({
                                      variant: "destructive",
                                    })
                                  )}
                                  onClick={() => remove(index)}
                                >
                                  Yes, remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
            cancelButton={
              <Button
                type="button"
                variant="outline"
                onClick={() => setPopoverOpen(false)}
              >
                Cancel
              </Button>
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
