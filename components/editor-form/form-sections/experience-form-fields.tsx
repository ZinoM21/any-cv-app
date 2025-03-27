import { useState } from "react";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Plus, Trash } from "lucide-react";

import { Position } from "@/lib/types";
import AddNewPositionForm from "./add-new-position-form";
import PositionFormFields from "./position-form-fields";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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

      <div className="space-y-4">
        <div className="border-b pb-2">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Positions</Label>
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
          <p className="text-xs text-slate-500">
            Add at least one position to continue
          </p>
        </div>

        <div className="rounded-md bg-indigo-50 p-3">
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
                  className="border-b border-slate-200 last:border-0 py-3 first:pt-1 last:pb-1"
                >
                  <AccordionTrigger className="py-0">
                    <span className="font-medium text-base">
                      {position.title ||
                        (fieldNamePrefix
                          ? `Position ${posIndex + 1}`
                          : "New Position")}
                      {position.startDate && (
                        <span className="ml-2 text-xs font-normal text-slate-500 whitespace-nowrap">
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
                                permanently remove this position entry from our
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
                                onClick={() => remove(posIndex)}
                              >
                                Yes, remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      <PositionFormFields
                        fieldNamePrefix={`${
                          fieldNamePrefix ? fieldNamePrefix + "." : ""
                        }positions.${posIndex}`}
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
