"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";

import {
  FieldValues,
  useFieldArray,
  useFormContext,
  UseFormSetValue,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Plus, Trash } from "lucide-react";

import { EditorForm } from "./editor-form";
import { PositionForm } from "./position";
import { useProfileStore } from "@/hooks/use-profile";
import { Experience } from "@/lib/types";

import AddNewExperienceForm from "./add-new-experience-form";
import { EditorTab, editorTabs } from "@/config/editor-tabs";

const positionSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  workSetting: z.string().optional().nullable(),
});

const experienceSchema = z.object({
  company: z.string(),
  companyProfileUrl: z.string().optional(),
  companyLogoUrl: z.string().optional(),
  positions: z.array(positionSchema),
});

const experiencesFormSchema = z.object({
  experiences: z.array(experienceSchema),
});

type ExperiencesFormValues = z.infer<typeof experiencesFormSchema>;

export function ExperiencesForm({
  changeToNextTab,
  activeTab,
  tab,
}: {
  changeToNextTab: (value?: string) => void;
  activeTab: string;
  tab: EditorTab;
}) {
  const profileData = useProfileStore((state) => state.profile);

  const initialValues: ExperiencesFormValues = {
    experiences: profileData?.experiences || [],
  };

  const tabIndex = editorTabs.findIndex((t) => t.name === "experience");

  return (
    <EditorForm
      schema={experiencesFormSchema}
      initialValues={initialValues}
      changeToNextTab={changeToNextTab}
      activeTab={activeTab}
      tab={tab}
      tabIndex={tabIndex}
    >
      {() => <ExperienceFormFields />}
    </EditorForm>
  );
}

const ExperienceFormFields = () => {
  const { control, setValue, watch } = useFormContext();

  const { fields, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const experiences: Experience[] = watch("experiences");

  const [newExperience, setNewExperience] = useState<Experience>({
    company: "",
    companyProfileUrl: "",
    companyLogoUrl: "",
    positions: [],
  });

  const handleCompanyLogoUpload = (
    setValue: UseFormSetValue<FieldValues>,
    index?: number
  ) => {
    // In a real app, this would open a file picker and handle the upload
    const url = prompt("Enter URL for company logo (for demo purposes):");
    if (url) {
      if (index !== undefined) {
        setValue(`experiences.${index}.companyLogoUrl`, url);
      } else {
        setNewExperience({
          ...newExperience,
          companyLogoUrl: url,
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Experiences
          </h3>

          <Accordion type="single" collapsible>
            {(fields as (Experience & { id: string })[]).map(
              (field, expIndex) => (
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
                            {field?.companyLogoUrl && (
                              <div className="size-10 overflow-hidden rounded-md bg-slate-100">
                                <Image
                                  src={
                                    field?.companyLogoUrl || "/placeholder.svg"
                                  }
                                  alt={field?.company || ""}
                                  width={80}
                                  height={80}
                                />
                              </div>
                            )}
                            <div>
                              <CardTitle className="text-base">
                                {field?.company}
                              </CardTitle>
                              <CardDescription>
                                {field?.positions?.length || 0}{" "}
                                {field?.positions?.length === 1
                                  ? "position"
                                  : "positions"}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                    </CardHeader>

                    <AccordionContent>
                      <CardContent className="px-4 pb-4 pt-0">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-slate-700">
                              Experience Details
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-400 hover:text-red-500"
                              onClick={() => remove(expIndex)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                              control={control}
                              name={`experiences.${expIndex}.company`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel
                                    htmlFor={`experiences.${expIndex}.company`}
                                  >
                                    Company
                                  </FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={control}
                              name={`experiences.${expIndex}.companyProfileUrl`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel
                                    htmlFor={`experiences.${expIndex}.companyProfileUrl`}
                                  >
                                    Company Profile URL (Optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="https://company.com"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Company Logo (Optional)</Label>
                            <div className="flex items-center gap-4">
                              {field?.companyLogoUrl ? (
                                <div className="h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                                  <Image
                                    src={
                                      field?.companyLogoUrl ||
                                      "/placeholder.svg"
                                    }
                                    alt={field?.company || ""}
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
                                onClick={() =>
                                  handleCompanyLogoUpload(setValue, expIndex)
                                }
                              >
                                Change Logo
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label>Positions</Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const positions = field?.positions || [];
                                  setValue(
                                    `experiences.${expIndex}.positions`,
                                    [
                                      ...positions,
                                      {
                                        title: "",
                                        startDate: "",
                                        description: "",
                                        location: "",
                                        workSetting: null,
                                      },
                                    ]
                                  );
                                }}
                              >
                                <Plus className="mr-2 h-3 w-3" />
                                Add Position
                              </Button>
                            </div>

                            <Accordion
                              type="single"
                              collapsible
                              className="w-full"
                            >
                              {field?.positions?.map((position, posIndex) => (
                                <AccordionItem
                                  key={posIndex}
                                  value={`position-${expIndex}-${posIndex}`}
                                >
                                  <AccordionTrigger className="py-2">
                                    <div className="flex items-center justify-between">
                                      <span>
                                        {position.title || "New Position"}
                                      </span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="pt-2">
                                      <PositionForm
                                        position={position}
                                        onChange={(updatedPosition) => {
                                          const updatedPositions = [
                                            ...field?.positions,
                                          ];
                                          updatedPositions[posIndex] =
                                            updatedPosition;
                                          setValue(
                                            `experiences.${expIndex}.positions`,
                                            updatedPositions
                                          );
                                        }}
                                        onRemove={() => {
                                          const updatedPositions = experiences[
                                            expIndex
                                          ]?.positions?.filter(
                                            (_, i) => i !== posIndex
                                          );
                                          setValue(
                                            `experiences.${expIndex}.positions`,
                                            updatedPositions
                                          );
                                        }}
                                      />
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        </div>
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      )}

      <AddNewExperienceForm
        handleCompanyLogoUpload={handleCompanyLogoUpload}
        newExperience={newExperience}
        setNewExperience={setNewExperience}
      />
    </div>
  );
};
