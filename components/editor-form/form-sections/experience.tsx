"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FormField } from "@/components/ui/form";

import { SignedImage } from "@/components/editor-form/form-sections/signed-image";
import { EditorTabName } from "@/config/editor-tab-names";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";
import {
  editExperiencesFormSchema,
  EditExperiencesFormValues,
} from "@/lib/schemas/editor-forms-schemas";
import AddNewPopover from "../add-new-popover";
import { EditorForm } from "../editor-form";
import RemoveAlertDialog from "../remove-alert-dialog";
import AddNewExperienceForm from "./add-new-experience-form";
import ExperienceFormFields from "./experience-form-fields";

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
  const { control } = useFormContext<EditExperiencesFormValues>();

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <div className="flex flex-col gap-6 mb-60">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Added Experiences
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {fields.map((experienceField, expIndex) => (
              <AccordionItem
                key={experienceField.id}
                value={`experience-${experienceField.id}`}
                className="border-none"
              >
                <Card
                  key={experienceField.id}
                  className="mx-0.5 shadow-sm rounded-lg"
                >
                  <CardHeader className="p-0">
                    <AccordionTrigger className="p-4 min-w-0 rounded-lg hover:no-underline hover:bg-accent data-[state=open]:hover:bg-background">
                      <div className="flex flex-1 items-start justify-between min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <FormField
                            name={`experiences.${expIndex}.companyLogoUrl`}
                            render={({ field }) => (
                              <SignedImage
                                path={field?.value}
                                alt={experienceField?.company}
                                width={80}
                                height={80}
                                className="size-10 min-w-10"
                              />
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
                          <h4 className="text-base font-medium">
                            Experience Details
                          </h4>
                          <RemoveAlertDialog
                            type="experience"
                            onRemove={() => remove(expIndex)}
                          />
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

      <AddNewPopover title="Add Experience">
        {(onClose) => (
          <AddNewExperienceForm
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
