"use client";
import { Dispatch, SetStateAction } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";

import { PositionForm } from "./position";

import { FieldValues, UseFieldArrayAppend } from "react-hook-form";
import { Experience } from "@/lib/types";
import Image from "next/image";

export default function AddNewExperienceForm({
  handleCompanyLogoUpload,
  newExperience,
  setNewExperience,
  append,
}: {
  handleCompanyLogoUpload: (index?: number) => void;
  newExperience: Experience;
  setNewExperience: Dispatch<SetStateAction<Experience>>;
  append: UseFieldArrayAppend<FieldValues, "experiences">;
}) {
  return (
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
                <Image
                  src={newExperience.companyLogoUrl || "/placeholder.svg"}
                  alt={newExperience.company}
                  className="h-full w-full object-contain"
                  width={80}
                  height={80}
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
              onClick={() => handleCompanyLogoUpload()}
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
                          const updatedPositions = [...newExperience.positions];
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
  );
}
