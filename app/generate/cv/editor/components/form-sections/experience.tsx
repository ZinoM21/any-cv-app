"use client";

import { useState } from "react";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { FormField } from "@/components/ui/form";

import { Plus, Trash } from "lucide-react";

import AddNewExperienceForm from "./add-new-experience-form";
import { EditorForm } from "./editor-form";
import ExperienceFormFields from "./experience-form-fields";
import {
  editExperiencesFormSchema,
  EditExperiencesFormValues,
} from "../editor-forms-schemas";
import { EditorTabName } from "@/config/editor-tab-names";
import { cn } from "@/lib/utils";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";

export function ExperiencesForm({ tabName }: { tabName: EditorTabName }) {
  const { getExperienceInitialValues } = useEditorFormInitialValues();
  const initialValues = getExperienceInitialValues();

  return (
    <EditorForm
      schema={editExperiencesFormSchema}
      initialValues={initialValues}
      tabName={tabName}
    >
      <ExperiencesFieldArray />
    </EditorForm>
  );
}

const ExperiencesFieldArray = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { control } = useFormContext<EditExperiencesFormValues>();

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "experiences",
  });

  // const handleCompanyLogoUpload = (index?: number) => {
  //   // In a real app, this would open a file picker and handle the upload
  //   const url = prompt("Enter URL for company logo (for demo purposes):");
  //   if (url) {
  //     if (index !== undefined) {
  //       setValue(`experiences.${index}.companyLogoUrl`, url);
  //     } else {
  //       setNewExperience({
  //         ...newExperience,
  //         companyLogoUrl: url,
  //       });
  //     }
  //   }
  // };

  return (
    <div className="space-y-6 mb-60">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Experiences
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {fields.map((experienceField, expIndex) => (
              <AccordionItem
                key={experienceField.id}
                value={`experience-${experienceField.id}`}
                className="border-none"
              >
                <Card key={experienceField.id}>
                  <CardHeader className="p-4">
                    <AccordionTrigger className="py-0 min-w-0">
                      <div className="flex flex-1 items-start justify-between min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <FormField
                            name={`experiences.${expIndex}.companyLogoUrl`}
                            render={({ field }) => (
                              <>
                                {field?.value ? (
                                  <div className="size-10 min-w-10 overflow-hidden rounded-md bg-slate-100">
                                    <Image
                                      src={field?.value || "/placeholder.svg"}
                                      alt={experienceField?.company || ""}
                                      width={80}
                                      height={80}
                                    />
                                  </div>
                                ) : (
                                  <div className="flex size-10 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 text-xs">
                                    Logo
                                  </div>
                                )}
                              </>
                            )}
                          />

                          <div className="min-w-0">
                            <CardTitle className="text-base">
                              <FormField
                                name={`experiences.${expIndex}.company`}
                                render={({ field }) =>
                                  field.value ? (
                                    <span className="block truncate">
                                      {field.value}
                                    </span>
                                  ) : (
                                    <span>Company {expIndex + 1}</span>
                                  )
                                }
                              />
                            </CardTitle>

                            <CardDescription>
                              <FormField
                                name={`experiences.${expIndex}.positions`}
                                render={({ field }) =>
                                  field.value ? (
                                    <span className="block truncate">
                                      {field?.value?.length || 0}{" "}
                                      {field?.value?.length === 1
                                        ? "position"
                                        : "positions"}
                                    </span>
                                  ) : (
                                    <span>
                                      No positions added for this experience
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
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-1">
                          <h4 className="text-base font-medium text-slate-800">
                            Experience Details
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
                                  permanently remove this experience entry from
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
                                  onClick={() => remove(expIndex)}
                                >
                                  Yes, remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>

                        <ExperienceFormFields
                          fieldNamePrefix={`experiences.${expIndex}`}
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
            Add Experience
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-4" side="right">
          <AddNewExperienceForm
            addToExperiences={(data) => {
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
