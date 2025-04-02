"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

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
import { FormField } from "@/components/ui/form";

import { EditorForm } from "../editor-form";

import {
  editProjectsFormSchema,
  EditProjectsFormValues,
} from "@/lib/editor-forms-schemas";
import { EditorTabName } from "@/config/editor-tab-names";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";
import ProjectFormFields from "./project-form-fields";
import AddNewProjectForm from "./add-new-project-form";
import AddNewPopover from "../add-new-popover";
import RemoveAlertDialog from "../remove-alert-dialog";
import { formatDateRange } from "@/lib/utils";

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
  const { control } = useFormContext<EditProjectsFormValues>();

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="flex flex-col gap-6 mb-60">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Added Projects
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {fields.map((projectField, index) => (
              <AccordionItem
                key={projectField.id}
                value={`projects-${projectField.id}`}
                className="border-none"
              >
                <Card
                  key={projectField.id}
                  className="mx-0.5 shadow-sm rounded-lg"
                >
                  <CardHeader className="p-0">
                    <AccordionTrigger className="p-4 min-w-0 rounded-lg hover:no-underline hover:bg-accent data-[state=open]:hover:bg-background">
                      <div className="flex flex-1 items-start justify-between min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="min-w-0">
                            <CardTitle className="text-base">
                              <FormField
                                name={`projects.${index}.role`}
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
                      </div>
                    </AccordionTrigger>
                  </CardHeader>

                  <AccordionContent>
                    <CardContent className="px-4 pb-4 pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-1">
                          <h4 className="text-base font-medium">
                            Project Details
                          </h4>
                          <RemoveAlertDialog
                            type="project"
                            onRemove={() => remove(index)}
                          />
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

      <AddNewPopover title="Add Project">
        {(onClose) => (
          <AddNewProjectForm
            onSubmit={(data) => {
              prepend(data);
              onClose();
            }}
            onCancel={onClose}
          />
        )}
      </AddNewPopover>
    </div>
  );
};
