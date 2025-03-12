"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Education } from "@/lib/types";
import Image from "next/image";

export function EducationForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
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
    <div className="space-y-6">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Education
          </h3>

          <Accordion type="single" collapsible className="space-y-6">
            {(fields as (Education & { id: string })[]).map((field, index) => (
              <AccordionItem
                key={field.id}
                value={`experience-${field.id}`}
                className="border-none"
              >
                <Card key={field.id}>
                  <CardHeader className="p-4">
                    <AccordionTrigger className="py-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {field.schoolPictureUrl && (
                            <div className="size-10 overflow-hidden rounded-md bg-slate-100">
                              <Image
                                src={
                                  field?.schoolPictureUrl || "/placeholder.svg"
                                }
                                alt={field?.school}
                                width={80}
                                height={80}
                              />
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-base">
                              <FormField
                                control={control}
                                name={`education.${index}.degree`}
                                render={({ field }) => field.value}
                              />
                            </CardTitle>
                            <CardDescription>
                              <FormField
                                control={control}
                                name={`education.${index}.school`}
                                render={({ field }) => field.value}
                              />
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </CardHeader>

                  <AccordionContent>
                    <CardContent className="px-4 pb-4 pt-0">
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-slate-700">
                            Education Details
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-red-500"
                            onClick={() => remove(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <FormField
                            control={control}
                            name={`education.${index}.school`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>School</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name={`education.${index}.degree`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <FormField
                            control={control}
                            name={`education.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input type="month" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name={`education.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input type="month" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name={`education.${index}.grade`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Grade (Optional)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="3.8 GPA" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={control}
                          name={`education.${index}.activities`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Activities (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Clubs, sports, honors societies, etc."
                                  rows={2}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`education.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Additional details about your education"
                                  rows={3}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
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

      {/* Add new education button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          append({
            school: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            grade: "",
            activities: "",
            description: "",
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
}
