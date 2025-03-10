"use client";

import { useState } from "react";

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
import { ProfileData } from "@/lib/types";
import { useProfileStore } from "@/hooks/use-profile";

export function ExperienceForm() {
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);

  const [newExperience, setNewExperience] = useState<
    ProfileData["experiences"][0]
  >({
    company: "",
    companyProfileUrl: "",
    companyLogoUrl: "",
    positions: [],
  });

  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.positions.length > 0) {
      setProfileData({
        ...profileData,
        experiences: [...profileData?.experiences, { ...newExperience }],
      });
      setNewExperience({
        company: "",
        companyProfileUrl: "",
        companyLogoUrl: "",
        positions: [],
      });
    }
  };

  const handleRemoveExperience = (index: number) => {
    setProfileData({
      ...profileData,
      experiences: profileData?.experiences.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience({
      ...newExperience,
      [name]: value,
    });
  };

  const handleCompanyLogoUpload = () => {
    // In a real app, this would open a file picker and handle the upload
    const url = prompt("Enter URL for company logo (for demo purposes):");
    if (url) {
      setNewExperience({
        ...newExperience,
        companyLogoUrl: url,
      });
    }
  };

  const toggleExpandExperience = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  const updateExistingExperience = (
    index: number,
    updatedExperience: ProfileData["experiences"][0]
  ) => {
    const updatedExperiences = [...profileData?.experiences];
    updatedExperiences[index] = updatedExperience;
    setProfileData({
      ...profileData,
      experiences: updatedExperiences,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Work Experience</h2>

      {/* Existing experiences */}
      {profileData?.experiences.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Experiences
          </h3>

          {profileData?.experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {exp.companyLogoUrl && (
                      <div className="h-10 w-10 overflow-hidden rounded-md bg-slate-100">
                        <img
                          src={exp.companyLogoUrl || "/placeholder.svg"}
                          alt={exp.company}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-base">{exp.company}</CardTitle>
                      <CardDescription>
                        {exp.positions.length}{" "}
                        {exp.positions.length === 1 ? "position" : "positions"}
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
                      onClick={() => handleRemoveExperience(index)}
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
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) =>
                            updateExistingExperience(index, {
                              ...exp,
                              company: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`companyProfileUrl-${index}`}>
                          Company Profile URL (Optional)
                        </Label>
                        <Input
                          id={`companyProfileUrl-${index}`}
                          value={exp.companyProfileUrl || ""}
                          onChange={(e) =>
                            updateExistingExperience(index, {
                              ...exp,
                              companyProfileUrl: e.target.value,
                            })
                          }
                          placeholder="https://company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Company Logo (Optional)</Label>
                      <div className="flex items-center gap-4">
                        {exp.companyLogoUrl ? (
                          <div className="h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                            <img
                              src={exp.companyLogoUrl || "/placeholder.svg"}
                              alt={exp.company}
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
                          onClick={() => {
                            const url = prompt(
                              "Enter URL for company logo (for demo purposes):"
                            );
                            if (url) {
                              updateExistingExperience(index, {
                                ...exp,
                                companyLogoUrl: url,
                              });
                            }
                          }}
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
                            updateExistingExperience(index, {
                              ...exp,
                              positions: [
                                ...exp.positions,
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

                      <Accordion type="multiple" className="w-full">
                        {exp.positions.map((position, posIndex) => (
                          <AccordionItem
                            key={posIndex}
                            value={`position-${posIndex}`}
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
                                    const updatedPositions = [...exp.positions];
                                    updatedPositions[posIndex] =
                                      updatedPosition;
                                    updateExistingExperience(index, {
                                      ...exp,
                                      positions: updatedPositions,
                                    });
                                  }}
                                  onRemove={() => {
                                    updateExistingExperience(index, {
                                      ...exp,
                                      positions: exp.positions.filter(
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onClick={handleCompanyLogoUpload}
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
            onClick={handleAddExperience}
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
}
