import { useFieldArray, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";

import { Position } from "@/lib/types";
import AddNewPositionForm from "./add-new-position-form";
import PositionFormFields from "./position-form-fields";
import { format } from "date-fns";
import { SignedImage } from "@/components/editor-form/form-sections/signed-image";
import AddNewPopover from "../add-new-popover";
import { ImageInput } from "@/components/editor-form/form-sections/image-input";
import RemoveAlertDialog from "../remove-alert-dialog";

export default function ExperienceFormFields({
  fieldNamePrefix,
}: {
  fieldNamePrefix?: string;
}) {
  const getFieldName = (fieldName: string) =>
    fieldNamePrefix ? `${fieldNamePrefix}.${fieldName}` : fieldName;

  const { control, getValues } = useFormContext();

  const companyName = getValues(getFieldName("company"));
  const posFieldName = getFieldName("positions");

  const {
    fields: positionFields,
    prepend,
    remove,
  } = useFieldArray({
    control,
    name: posFieldName,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name={getFieldName("company")}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={getFieldName("company")}>Company</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Acme LLC" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={getFieldName("companyProfileUrl")}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={getFieldName("companyProfileUrl")}>
                Link (Optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="https://company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={getFieldName("companyLogoUrl")}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={getFieldName("companyLogoUrl")}>
              Logo (Optional)
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <SignedImage
                  path={field?.value}
                  alt={companyName}
                  width={80}
                  height={80}
                />
                <ImageInput field={field} fileName="company_logo" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="border-b pb-2">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Positions</Label>
            <AddNewPopover
              title="Add Position"
              trigger={
                <Button variant="outline" size="sm">
                  <Plus className="size-3" />
                  Add Position
                </Button>
              }
            >
              {(onClose) => (
                <AddNewPositionForm
                  onSubmit={(data) => {
                    prepend(data);
                    onClose();
                  }}
                  onCancel={onClose}
                />
              )}
            </AddNewPopover>
          </div>
          <p className="text-xs text-muted-foreground">
            Add at least one position to continue
          </p>
        </div>

        <div className="rounded-md bg-primary/10 p-3">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={`${posFieldName}.0`}
          >
            {(positionFields as (Position & { id: string })[]).map(
              (position, posIndex) => (
                <AccordionItem
                  key={posIndex}
                  value={`${posFieldName}.${posIndex}`}
                  className="border-b border-muted last:border-0 py-3 first:pt-1 last:pb-1"
                >
                  <AccordionTrigger className="py-0">
                    <span className="font-medium text-base">
                      {position.title ||
                        (fieldNamePrefix
                          ? `Position ${posIndex + 1}`
                          : "New Position")}
                      {position.startDate && (
                        <span className="ml-2 text-xs font-normal text-muted-foreground whitespace-nowrap">
                          {format(position.startDate, "MMM uu")} -{" "}
                          {position.endDate
                            ? format(position.endDate, "MMM uu")
                            : "Present"}
                        </span>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="pt-3 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                          Position Details
                        </h4>
                        <RemoveAlertDialog
                          type="position"
                          onRemove={() => remove(posIndex)}
                        />
                      </div>

                      <PositionFormFields
                        fieldNamePrefix={`${posFieldName}.${posIndex}`}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}
