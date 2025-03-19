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

import { EditorForm } from "./editor-form";
import VolunteeringFormFields from "./volunteering-form-fields";
import AddNewVolunteeringForm from "./add-new-volunteering-form";
import {
  editVolunteeringFormSchema,
  EditVolunteeringFormValues,
} from "../editor-forms-schemas";
import { EditorTabName } from "@/config/editor-tab-names";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";

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
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { control } = useFormContext<EditVolunteeringFormValues>();

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
            {fields.map((volunteeringField, index) => (
              <AccordionItem
                key={volunteeringField.id}
                value={`volunteering-${volunteeringField.id}`}
                className="border-none"
              >
                <Card key={volunteeringField.id}>
                  <CardHeader className="p-4">
                    <AccordionTrigger className="py-0 min-w-0">
                      <div className="flex flex-1 items-start justify-between min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <FormField
                            name={`volunteering.${index}.organizationLogoUrl`}
                            render={({ field }) => (
                              <>
                                {field?.value ? (
                                  <div className="size-10 min-w-10 overflow-hidden rounded-md bg-slate-100">
                                    <Image
                                      src={field?.value || "/placeholder.svg"}
                                      alt={
                                        volunteeringField?.organization || ""
                                      }
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
                                    <span>Organization {index + 1}</span>
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
                            Volunteering Details
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
                                  permanently remove this volunteering entry
                                  from our servers.
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
