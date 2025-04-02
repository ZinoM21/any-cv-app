"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
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

import { EditorForm } from "../editor-form";
import EducationFormFields from "./education-form-fields";
import AddNewEducationForm from "./add-new-education-form";
import {
  editEducationFormSchema,
  EditEducationFormValues,
} from "@/lib/editor-forms-schemas";
import { EditorTabName } from "@/config/editor-tab-names";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";
import AddNewPopover from "../add-new-popover";
import RemoveAlertDialog from "../remove-alert-dialog";
import { SignedImage } from "@/components/editor-form/form-sections/signed-image";

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
    <div className="flex flex-col gap-6 mb-60">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Added Education
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {fields.map((eduField, index) => (
              <AccordionItem
                key={eduField.id}
                value={`education-${eduField.id}`}
                className="border-none"
              >
                <Card key={eduField.id} className="mx-0.5 shadow-sm rounded-lg">
                  <CardHeader className="p-0">
                    <AccordionTrigger className="p-4 min-w-0 rounded-lg hover:no-underline hover:bg-accent data-[state=open]:hover:bg-background">
                      <div className="flex flex-1 items-start justify-between min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <FormField
                            name={`education.${index}.schoolPictureUrl`}
                            render={({ field }) => (
                              <SignedImage
                                src={field?.value}
                                alt={eduField?.school}
                                width={80}
                                height={80}
                                className="size-10 min-w-10"
                              />
                            )}
                          />
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
                                    <span>Education {index + 1}</span>
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
                                    <span>School of education {index + 1}</span>
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
                    <CardContent className="p-4 pt-0">
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between border-b pb-1">
                          <h4 className="text-base font-medium">
                            Education Details
                          </h4>
                          <RemoveAlertDialog
                            type="education"
                            onRemove={() => remove(index)}
                          />
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

      <AddNewPopover title="Add Education">
        {(onClose) => (
          <AddNewEducationForm
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
