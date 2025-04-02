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
import VolunteeringFormFields from "./volunteering-form-fields";
import AddNewVolunteeringForm from "./add-new-volunteering-form";
import {
  editVolunteeringFormSchema,
  EditVolunteeringFormValues,
} from "@/lib/editor-forms-schemas";
import { EditorTabName } from "@/config/editor-tab-names";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";
import AddNewPopover from "../add-new-popover";
import RemoveAlertDialog from "../remove-alert-dialog";
import { SignedImage } from "@/components/editor-form/form-sections/signed-image";

export function VolunteeringForm({ tabName }: { tabName: EditorTabName }) {
  const { getVolunteeringInitialValues } = useEditorFormInitialValues();
  const initialValues = getVolunteeringInitialValues();

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
  const { control } = useFormContext<EditVolunteeringFormValues>();

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "volunteering",
  });

  return (
    <div className="flex flex-col gap-6 mb-60">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Added Volunteering
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {fields.map((volField, index) => (
              <AccordionItem
                key={volField.id}
                value={`volunteering-${volField.id}`}
                className="border-none"
              >
                <Card key={volField.id} className="mx-0.5 shadow-sm rounded-lg">
                  <CardHeader className="p-0">
                    <AccordionTrigger className="p-4 min-w-0 rounded-lg hover:no-underline hover:bg-accent data-[state=open]:hover:bg-background">
                      <div className="flex flex-1 items-start justify-between min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <FormField
                            name={`volunteering.${index}.organizationLogoUrl`}
                            render={({ field }) => (
                              <SignedImage
                                src={field?.value}
                                alt={volField?.organization}
                                width={80}
                                height={80}
                                className="size-10 min-w-10"
                              />
                            )}
                          />
                          <div className="min-w-0">
                            <CardTitle className="text-base">
                              <FormField
                                name={`volunteering.${index}.role`}
                                render={({ field }) =>
                                  field.value ? (
                                    <span className="block truncate">
                                      {field.value}
                                    </span>
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
                                    <span className="block truncate">
                                      {field.value}
                                    </span>
                                  ) : (
                                    <span>
                                      Organization of volunteering {index + 1}
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
                            Volunteering Details
                          </h4>
                          <RemoveAlertDialog
                            type="volunteering"
                            onRemove={() => remove(index)}
                          />
                        </div>

                        <VolunteeringFormFields
                          fieldNamePrefix={`volunteering.${index}`}
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

      <AddNewPopover title="Add Volunteering">
        {(onClose) => (
          <AddNewVolunteeringForm
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
