"use client";

import { useState } from "react";
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
import { Plus, Trash } from "lucide-react";
import { FormField } from "@/components/ui/form";
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

import { EditorForm } from "../editor-form";

import {
  editProjectsFormSchema,
  EditProjectsFormValues,
} from "@/lib/editor-forms-schemas";
import { EditorTabName } from "@/config/editor-tab-names";
import { cn, formatDateRange } from "@/lib/utils";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";
import ProjectFormFields from "./project-form-fields";
import AddNewProjectForm from "./add-new-project-form";

export function ProjectsForm({ tabName }: { tabName: EditorTabName }) {
  const { getProjectsInitialValues } = useEditorFormInitialValues();
  const initialValues = getProjectsInitialValues();

  return (
    <EditorForm
      schema={editProjectsFormSchema}
      initialValues={initialValues}
      tabName={tabName}
    >
      <ProjectsFieldArray />
    </EditorForm>
  );
}

const ProjectsFieldArray = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { control } = useFormContext<EditProjectsFormValues>();

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="space-y-6 mb-60">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">Added Projects</h3>

          <Accordion type="single" collapsible className="space-y-6">
            {fields.map((projectField, index) => (
              <AccordionItem
                key={projectField.id}
                value={`project-${projectField.id}`}
                className="border-none"
              >
                <Card key={projectField.id}>
                  <CardHeader className="p-4">
                    <AccordionTrigger className="py-0 min-w-0">
                      <div className="flex flex-1 items-start justify-between min-w-0">
                        <div className="flex flex-col min-w-0">
                          <CardTitle className="text-base">
                            <FormField
                              name={`projects.${index}.title`}
                              render={({ field }) =>
                                field.value ? (
                                  <span className="block truncate">
                                    {field.value}
                                  </span>
                                ) : (
                                  <span>Project {index + 1}</span>
                                )
                              }
                            />
                          </CardTitle>
                          <CardDescription>
                            <FormField
                              name={`projects.${index}.startDate`}
                              render={({ field: startDateField }) => (
                                <FormField
                                  name={`projects.${index}.endDate`}
                                  render={({ field: endDateField }) => (
                                    <span className="block truncate">
                                      {startDateField.value &&
                                        formatDateRange(
                                          startDateField.value,
                                          endDateField.value
                                        )}
                                    </span>
                                  )}
                                />
                              )}
                            />
                          </CardDescription>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </CardHeader>

                  <AccordionContent>
                    <CardContent className="px-4 pb-4 pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-1">
                          <h4 className="text-base font-medium text-slate-800">
                            Project Details
                          </h4>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-red-500"
                              >
                                <Trash className="size-4" />
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
                                  permanently remove this project entry from our
                                  servers.
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

                        <ProjectFormFields
                          fieldNamePrefix={`projects.${index}`}
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
            Add Project
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-4" side="right">
          <AddNewProjectForm
            addToProjects={(data) => {
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
