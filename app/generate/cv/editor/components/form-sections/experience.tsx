"use client";

import { useState } from "react";
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
import { Plus, Trash, ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PositionForm } from "./position";
import { Experience, ProfileData } from "@/lib/types";
import { useProfileStore } from "@/hooks/use-profile";
import Image from "next/image";
import { EditorForm } from "./editor-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

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

const experienceFormSchema = z.object({
  experiences: z.array(experienceSchema),
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

export function ExperienceForm({
  changeToNextTab,
  activeTab,
}: {
  changeToNextTab: (value?: string) => void;
  activeTab: string;
}) {
  const profileData = useProfileStore((state) => state.profile);

  const initialValues: ExperienceFormValues = {
    experiences: profileData?.experiences || [],
  };

  return (
    <EditorForm
      schema={experienceFormSchema}
      initialValues={initialValues}
      changeToNextTab={changeToNextTab}
      activeTab={activeTab}
      nextTabLabel="Education"
      title="Work Experience"
    >
      {() => <ExperienceFormFields />}
    </EditorForm>
  );
}

const ExperienceFormFields = () => {
  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const experiences: Experience[] = watch("experiences");

  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );
  const [newExperience, setNewExperience] = useState<
    ProfileData["experiences"][0]
  >({
    company: "",
    companyProfileUrl: "",
    companyLogoUrl: "",
    positions: [],
  });

  const toggleExpandExperience = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

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
      {/* Existing experiences */}
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Experiences
          </h3>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {experiences[index]?.companyLogoUrl && (
                      <div className="size-10 overflow-hidden rounded-md bg-slate-100">
                        <Image
                          src={
                            experiences[index]?.companyLogoUrl ||
                            "/placeholder.svg"
                          }
                          alt={experiences[index]?.company || ""}
                          width={80}
                          height={80}
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-base">
                        {experiences[index]?.company}
                      </CardTitle>
                      <CardDescription>
                        {experiences[index]?.positions?.length || 0}{" "}
                        {experiences[index]?.positions?.length === 1
                          ? "position"
                          : "positions"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpandExperience(index)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      {expandedExperience === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-red-500"
                      onClick={() => remove(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedExperience === index && (
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={control}
                        name={`experiences.${index}.company`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`experiences.${index}.companyProfileUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
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
                        {experiences[index]?.companyLogoUrl ? (
                          <div className="h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                            <Image
                              src={
                                experiences[index]?.companyLogoUrl ||
                                "/placeholder.svg"
                              }
                              alt={experiences[index]?.company || ""}
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
                            handleCompanyLogoUpload(setValue, index)
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
                            const positions =
                              experiences[index]?.positions || [];
                            setValue(`experiences.${index}.positions`, [
                              ...positions,
                              {
                                title: "",
                                startDate: "",
                                description: "",
                                location: "",
                                workSetting: null,
                              },
                            ]);
                          }}
                        >
                          <Plus className="mr-2 h-3 w-3" />
                          Add Position
                        </Button>
                      </div>

                      <Accordion type="multiple" className="w-full">
                        {experiences[index]?.positions?.map(
                          (position, posIndex) => (
                            <AccordionItem
                              key={posIndex}
                              value={`position-${index}-${posIndex}`}
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
                                        ...experiences[index]?.positions,
                                      ];
                                      updatedPositions[posIndex] =
                                        updatedPosition;
                                      setValue(
                                        `experiences.${index}.positions`,
                                        updatedPositions
                                      );
                                    }}
                                    onRemove={() => {
                                      const updatedPositions = experiences[
                                        index
                                      ]?.positions?.filter(
                                        (_, i) => i !== posIndex
                                      );
                                      setValue(
                                        `experiences.${index}.positions`,
                                        updatedPositions
                                      );
                                    }}
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add new experience form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add Experience</CardTitle>
          <CardDescription>Add your work history at a company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                value={newExperience.company}
                onChange={(e) => {
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  });
                }}
                placeholder="Acme Inc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyProfileUrl">
                Company Profile URL (Optional)
              </Label>
              <Input
                id="companyProfileUrl"
                name="companyProfileUrl"
                value={newExperience.companyProfileUrl || ""}
                onChange={(e) => {
                  setNewExperience({
                    ...newExperience,
                    companyProfileUrl: e.target.value,
                  });
                }}
                placeholder="https://company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Company Logo (Optional)</Label>
            <div className="flex items-center gap-4">
              {newExperience.companyLogoUrl ? (
                <div className="h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                  <img
                    src={newExperience.companyLogoUrl || "/placeholder.svg"}
                    alt={newExperience.company}
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
                onClick={() => handleCompanyLogoUpload(setValue)}
              >
                Upload Logo
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
                  setNewExperience({
                    ...newExperience,
                    positions: [
                      ...newExperience.positions,
                      {
                        title: "",
                        startDate: "",
                        description: "",
                        location: "",
                        workSetting: null,
                      },
                    ],
                  });
                }}
              >
                <Plus className="mr-2 h-3 w-3" />
                Add Position
              </Button>
            </div>

            {newExperience.positions.length > 0 ? (
              <Accordion type="multiple" className="w-full">
                {newExperience.positions.map((position, posIndex) => (
                  <AccordionItem
                    key={posIndex}
                    value={`new-position-${posIndex}`}
                  >
                    <AccordionTrigger className="py-2">
                      <div className="flex items-center justify-between">
                        <span>{position.title || "New Position"}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2">
                        <PositionForm
                          position={position}
                          onChange={(updatedPosition) => {
                            const updatedPositions = [
                              ...newExperience.positions,
                            ];
                            updatedPositions[posIndex] = updatedPosition;
                            setNewExperience({
                              ...newExperience,
                              positions: updatedPositions,
                            });
                          }}
                          onRemove={() => {
                            setNewExperience({
                              ...newExperience,
                              positions: newExperience.positions.filter(
                                (_, i) => i !== posIndex
                              ),
                            });
                          }}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-500">
                  Add at least one position to continue
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              if (newExperience.company && newExperience.positions.length > 0) {
                append(newExperience);
                setNewExperience({
                  company: "",
                  companyProfileUrl: "",
                  companyLogoUrl: "",
                  positions: [],
                });
              }
            }}
            disabled={
              !newExperience.company || newExperience.positions.length === 0
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
