import Image from "next/image";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Plus, Trash } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Position } from "@/lib/types";
import AddNewPositionForm from "./add-new-position-form";
import PositionFormFields from "./position-form-fields";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function ExperienceFormFields({
  fieldNamePrefix,
}: {
  fieldNamePrefix?: string;
}) {
  const getFieldName = (fieldName: string) =>
    fieldNamePrefix ? `${fieldNamePrefix}.${fieldName}` : fieldName;

  const { control, getValues } = useFormContext();

  const companyName = getValues(getFieldName("company"));

  const [popoverOpen, setPopoverOpen] = useState(false);

  const {
    fields: positionFields,
    prepend,
    remove,
  } = useFieldArray({
    control,
    name: getFieldName("positions"),
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
                <Input {...field} />
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
                Company Profile URL (Optional)
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
              Company Logo (Optional)
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                {field.value ? (
                  <div className="h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                    <Image
                      src={field.value || "/placeholder.svg"}
                      alt={companyName + "Logo" || ""}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                    Logo
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  // onClick={() => handleCompanyLogoUpload(expIndex)}
                >
                  Change Logo
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Positions</Label>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="size-3" />
                Add Position
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px] p-4" side="right">
              <AddNewPositionForm
                addToPositions={(data) => {
                  prepend(data);
                  setPopoverOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue={`${
            fieldNamePrefix ? fieldNamePrefix + "." : ""
          }position-0`}
        >
          {(positionFields as (Position & { id: string })[]).map(
            (position, posIndex) => (
              <AccordionItem
                key={posIndex}
                value={`${
                  fieldNamePrefix ? fieldNamePrefix + "." : ""
                }position-${posIndex}`}
              >
                <AccordionTrigger className="py-2">
                  <div className="flex items-center justify-between">
                    <span>
                      {position.title ||
                        (fieldNamePrefix
                          ? `Position ${posIndex + 1}`
                          : "New Position")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-slate-700">
                          Position Details
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-red-500"
                          onClick={() => remove(posIndex)}
                        >
                          <Trash className="size-4" />
                          Remove
                        </Button>
                      </div>

                      <PositionFormFields
                        fieldNamePrefix={`${
                          fieldNamePrefix ? fieldNamePrefix + "." : ""
                        }positions.${posIndex}`}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </>
  );
}
